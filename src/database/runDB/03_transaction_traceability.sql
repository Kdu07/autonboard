-- Transaction traceability (PostgreSQL)
-- This script adds audit tables + triggers to capture row-level changes per DB transaction.
--
-- How to correlate:
--   Set `application_name` in the session before running your business transaction.
--   Example (psql): SET application_name = 'CORRELATION-123';
--
-- How to bypass audit logging (useful for maintenance/rollback):
--   Set `application_name` = 'AUDIT_BYPASS' for the session (or via SET LOCAL).
--
-- After this script, you can rollback changes done by a transaction using `rollback.sql`.

BEGIN;

CREATE SCHEMA IF NOT EXISTS audit;

-- One record per txid
CREATE TABLE IF NOT EXISTS audit.transaction_trace (
  txid BIGINT PRIMARY KEY,
  application_name TEXT,
  client_identifier TEXT,
  changed_by TEXT,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- One record per changed row
CREATE TABLE IF NOT EXISTS audit.row_change (
  id BIGSERIAL PRIMARY KEY,
  txid BIGINT NOT NULL,
  table_name TEXT NOT NULL,
  operation CHAR(1) NOT NULL CHECK (operation IN ('I', 'U', 'D')),
  pk_id BIGINT NOT NULL,
  old_data JSONB,
  new_data JSONB,
  application_name TEXT,
  client_identifier TEXT,
  changed_by TEXT,
  changed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_row_change_txid ON audit.row_change (txid);

-- Trigger function that captures OLD/NEW row images for undo/rollback.
CREATE OR REPLACE FUNCTION audit.capture_row_change()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  v_op CHAR(1);
  v_old JSONB;
  v_new JSONB;
  v_pk BIGINT;
  v_app TEXT;
  v_client TEXT;
  v_user TEXT;
BEGIN
  v_app := COALESCE(current_setting('application_name', true), '');
  -- Maintenance bypass (rollback scripts set this)
  IF v_app = 'AUDIT_BYPASS' THEN
    IF TG_OP = 'DELETE' THEN
      RETURN OLD;
    ELSE
      RETURN NEW;
    END IF;
  END IF;

  v_client := current_setting('client_identifier', true);
  v_user := session_user;

  -- Assumption: all audited tables have an `id` primary key column
  IF TG_OP = 'DELETE' THEN
    v_pk := OLD.id;
  ELSE
    v_pk := NEW.id;
  END IF;

  v_op := CASE TG_OP
            WHEN 'INSERT' THEN 'I'
            WHEN 'UPDATE' THEN 'U'
            ELSE 'D'
          END;

  IF TG_OP = 'INSERT' THEN
    v_old := NULL;
    v_new := to_jsonb(NEW);
  ELSIF TG_OP = 'UPDATE' THEN
    v_old := to_jsonb(OLD);
    v_new := to_jsonb(NEW);
  ELSE
    v_old := to_jsonb(OLD);
    v_new := NULL;
  END IF;

  INSERT INTO audit.transaction_trace (txid, application_name, client_identifier, changed_by)
  VALUES (txid_current(), v_app, v_client, v_user)
  ON CONFLICT (txid) DO NOTHING;

  INSERT INTO audit.row_change (
    txid, table_name, operation, pk_id, old_data, new_data,
    application_name, client_identifier, changed_by
  )
  VALUES (
    txid_current(), TG_TABLE_NAME, v_op, v_pk, v_old, v_new,
    v_app, v_client, v_user
  );

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$;

-- Triggers per table
DROP TRIGGER IF EXISTS trg_customer_audit ON public.customer;
CREATE TRIGGER trg_customer_audit
AFTER INSERT OR UPDATE OR DELETE ON public.customer
FOR EACH ROW EXECUTE FUNCTION audit.capture_row_change();

DROP TRIGGER IF EXISTS trg_building_audit ON public.building;
CREATE TRIGGER trg_building_audit
AFTER INSERT OR UPDATE OR DELETE ON public.building
FOR EACH ROW EXECUTE FUNCTION audit.capture_row_change();

DROP TRIGGER IF EXISTS trg_floor_audit ON public.floor;
CREATE TRIGGER trg_floor_audit
AFTER INSERT OR UPDATE OR DELETE ON public.floor
FOR EACH ROW EXECUTE FUNCTION audit.capture_row_change();

DROP TRIGGER IF EXISTS trg_amenity_audit ON public.amenity;
CREATE TRIGGER trg_amenity_audit
AFTER INSERT OR UPDATE OR DELETE ON public.amenity
FOR EACH ROW EXECUTE FUNCTION audit.capture_row_change();

DROP TRIGGER IF EXISTS trg_amenity_configuration_audit ON public.amenity_configuration;
CREATE TRIGGER trg_amenity_configuration_audit
AFTER INSERT OR UPDATE OR DELETE ON public.amenity_configuration
FOR EACH ROW EXECUTE FUNCTION audit.capture_row_change();

DROP TRIGGER IF EXISTS trg_submission_audit ON public.submission;
CREATE TRIGGER trg_submission_audit
AFTER INSERT OR UPDATE OR DELETE ON public.submission
FOR EACH ROW EXECUTE FUNCTION audit.capture_row_change();

COMMIT;

