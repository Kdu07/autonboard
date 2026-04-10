-- Creation of the CUSTOMER table
CREATE TABLE IF NOT EXISTS CUSTOMER (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255)  NOT NULL,
    modules_enabled JSONB
);

-- Creation of the BUILDING table
CREATE TABLE IF NOT EXISTS BUILDING (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    address TEXT,
    number_of_floors INT,
    total_area DECIMAL(12, 2),
    images_url JSONB,
    CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES CUSTOMER(id) ON DELETE CASCADE
);

-- Creation of the FLOOR table
CREATE TABLE IF NOT EXISTS FLOOR (
    id SERIAL PRIMARY KEY,
    building_id INT NOT NULL,
    floor_number INT NOT NULL,
    floor_area DECIMAL(12, 2),
    CONSTRAINT fk_building FOREIGN KEY (building_id) REFERENCES BUILDING(id) ON DELETE CASCADE
);

-- Creation of the AMENITY table
-- Note: parent_amenity_id allows self-referencing for sub-amenities
CREATE TABLE IF NOT EXISTS AMENITY (
    id SERIAL PRIMARY KEY,
    building_id INT NOT NULL,
    floor_id INT,
    parent_amenity_id INT,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    capacity INT,
    area_m2 DECIMAL(10, 2),
    images_url JSONB,
    CONSTRAINT fk_amenity_building FOREIGN KEY (building_id) REFERENCES BUILDING(id) ON DELETE CASCADE,
    CONSTRAINT fk_amenity_floor FOREIGN KEY (floor_id) REFERENCES FLOOR(id) ON DELETE SET NULL,
    CONSTRAINT fk_amenity_parent FOREIGN KEY (parent_amenity_id) REFERENCES AMENITY(id) ON DELETE CASCADE
);

-- Creation of the AMENITY_CONFIGURATION table
CREATE TABLE IF NOT EXISTS AMENITY_CONFIGURATION (
    id SERIAL PRIMARY KEY,
    amenity_id INT NOT NULL,
    key VARCHAR(100) NOT NULL,
    value TEXT,
    reservable BOOLEAN DEFAULT FALSE,
    image_url TEXT,
    CONSTRAINT fk_config_amenity FOREIGN KEY (amenity_id) REFERENCES AMENITY(id) ON DELETE CASCADE
);

-- Creation of the SUBMISSION table
CREATE TABLE IF NOT EXISTS SUBMISSION (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    file_path TEXT NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    file_name VARCHAR(255),
    CONSTRAINT fk_submission_customer FOREIGN KEY (customer_id) REFERENCES CUSTOMER(id) ON DELETE CASCADE
);