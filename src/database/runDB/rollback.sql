BEGIN;
SET LOCAL application_name = 'AUDIT_BYPASS';

DO $$
DECLARE
  v_txid BIGINT := :'txid';
  r RECORD;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM audit.transaction_trace WHERE txid = v_txid) THEN
    RAISE EXCEPTION 'No audit trace found for txid=%', v_txid;
  END IF;

  -- Reverse order to better respect FK dependencies
  FOR r IN
    SELECT *
    FROM audit.row_change
    WHERE txid = v_txid
    ORDER BY changed_at DESC, id DESC
  LOOP
    IF r.table_name = 'customer' THEN
      IF r.operation = 'I' THEN
        DELETE FROM public.customer WHERE id = r.pk_id;
      ELSIF r.operation = 'U' THEN
        UPDATE public.customer
        SET
          name = r.old_data->>'name',
          email = r.old_data->>'email',
          modules_enabled = NULLIF(r.old_data->>'modules_enabled','null')::jsonb
        WHERE id = r.pk_id;
      ELSE -- 'D'
        INSERT INTO public.customer(id, name, email, modules_enabled)
        VALUES (
          (r.old_data->>'id')::INT,
          r.old_data->>'name',
          r.old_data->>'email',
          NULLIF(r.old_data->>'modules_enabled','null')::jsonb
        );
      END IF;

    ELSIF r.table_name = 'building' THEN
      IF r.operation = 'I' THEN
        DELETE FROM public.building WHERE id = r.pk_id;
      ELSIF r.operation = 'U' THEN
        UPDATE public.building
        SET
          customer_id = (r.old_data->>'customer_id')::INT,
          name = r.old_data->>'name',
          type = r.old_data->>'type',
          address = r.old_data->>'address',
          number_of_floors = (r.old_data->>'number_of_floors')::INT,
          total_area = NULLIF(r.old_data->>'total_area','null')::NUMERIC(12,2),
          images_url = NULLIF(r.old_data->>'images_url','null')::jsonb
        WHERE id = r.pk_id;
      ELSE -- 'D'
        INSERT INTO public.building(
          id, customer_id, name, type, address, number_of_floors, total_area, images_url
        )
        VALUES (
          (r.old_data->>'id')::INT,
          (r.old_data->>'customer_id')::INT,
          r.old_data->>'name',
          r.old_data->>'type',
          r.old_data->>'address',
          (r.old_data->>'number_of_floors')::INT,
          NULLIF(r.old_data->>'total_area','null')::NUMERIC(12,2),
          NULLIF(r.old_data->>'images_url','null')::jsonb
        );
      END IF;

    ELSIF r.table_name = 'floor' THEN
      IF r.operation = 'I' THEN
        DELETE FROM public.floor WHERE id = r.pk_id;
      ELSIF r.operation = 'U' THEN
        UPDATE public.floor
        SET
          building_id = (r.old_data->>'building_id')::INT,
          floor_number = (r.old_data->>'floor_number')::INT,
          floor_area = NULLIF(r.old_data->>'floor_area','null')::NUMERIC(12,2)
        WHERE id = r.pk_id;
      ELSE -- 'D'
        INSERT INTO public.floor(id, building_id, floor_number, floor_area)
        VALUES (
          (r.old_data->>'id')::INT,
          (r.old_data->>'building_id')::INT,
          (r.old_data->>'floor_number')::INT,
          NULLIF(r.old_data->>'floor_area','null')::NUMERIC(12,2)
        );
      END IF;

    ELSIF r.table_name = 'amenity' THEN
      IF r.operation = 'I' THEN
        DELETE FROM public.amenity WHERE id = r.pk_id;
      ELSIF r.operation = 'U' THEN
        UPDATE public.amenity
        SET
          building_id = (r.old_data->>'building_id')::INT,
          floor_id = NULLIF(r.old_data->>'floor_id','null')::INT,
          parent_amenity_id = NULLIF(r.old_data->>'parent_amenity_id','null')::INT,
          name = r.old_data->>'name',
          type = r.old_data->>'type',
          capacity = NULLIF(r.old_data->>'capacity','null')::INT,
          area_m2 = NULLIF(r.old_data->>'area_m2','null')::NUMERIC(10,2),
          images_url = NULLIF(r.old_data->>'images_url','null')::jsonb
        WHERE id = r.pk_id;
      ELSE -- 'D'
        INSERT INTO public.amenity(
          id, building_id, floor_id, parent_amenity_id, name, type, capacity, area_m2, images_url
        )
        VALUES (
          (r.old_data->>'id')::INT,
          (r.old_data->>'building_id')::INT,
          NULLIF(r.old_data->>'floor_id','null')::INT,
          NULLIF(r.old_data->>'parent_amenity_id','null')::INT,
          r.old_data->>'name',
          r.old_data->>'type',
          NULLIF(r.old_data->>'capacity','null')::INT,
          NULLIF(r.old_data->>'area_m2','null')::NUMERIC(10,2),
          NULLIF(r.old_data->>'images_url','null')::jsonb
        );
      END IF;

    ELSIF r.table_name = 'amenity_configuration' THEN
      IF r.operation = 'I' THEN
        DELETE FROM public.amenity_configuration WHERE id = r.pk_id;
      ELSIF r.operation = 'U' THEN
        UPDATE public.amenity_configuration
        SET
          amenity_id = (r.old_data->>'amenity_id')::INT,
          "key" = r.old_data->>'key',
          value = r.old_data->>'value',
          reservable = (r.old_data->>'reservable')::BOOLEAN,
          image_url = r.old_data->>'image_url'
        WHERE id = r.pk_id;
      ELSE -- 'D'
        INSERT INTO public.amenity_configuration(id, amenity_id, "key", value, reservable, image_url)
        VALUES (
          (r.old_data->>'id')::INT,
          (r.old_data->>'amenity_id')::INT,
          r.old_data->>'key',
          r.old_data->>'value',
          (r.old_data->>'reservable')::BOOLEAN,
          r.old_data->>'image_url'
        );
      END IF;

    ELSIF r.table_name = 'submission' THEN
      IF r.operation = 'I' THEN
        DELETE FROM public.submission WHERE id = r.pk_id;
      ELSIF r.operation = 'U' THEN
        UPDATE public.submission
        SET
          customer_id = (r.old_data->>'customer_id')::INT,
          status      = r.old_data->>'status',
          -- BYTEA is stored as \xHEX in JSONB; strip the leading \x before decoding
          file        = decode(substring(r.old_data->>'file' FROM 3), 'hex'),
          file_type   = r.old_data->>'file_type',
          upload_date = (r.old_data->>'upload_date')::TIMESTAMP
        WHERE id = r.pk_id;
      ELSE -- 'D'
        INSERT INTO public.submission(id, customer_id, status, file, file_type, upload_date)
        VALUES (
          (r.old_data->>'id')::INT,
          (r.old_data->>'customer_id')::INT,
          r.old_data->>'status',
          decode(substring(r.old_data->>'file' FROM 3), 'hex'),
          r.old_data->>'file_type',
          (r.old_data->>'upload_date')::TIMESTAMP
        );
      END IF;
    ELSE
      RAISE NOTICE 'Skipping rollback for unhandled table: %', r.table_name;
    END IF;
  END LOOP;
END $$;

COMMIT;

