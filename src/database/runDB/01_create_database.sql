-- Criação da tabela CUSTOMER
CREATE TABLE CUSTOMER (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255)  NOT NULL,
    modules_enabled JSONB
);

-- Criação da tabela BUILDING
CREATE TABLE BUILDING (
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

-- Criação da tabela FLOOR
CREATE TABLE FLOOR (
    id SERIAL PRIMARY KEY,
    building_id INT NOT NULL,
    floor_number INT NOT NULL,
    floor_area DECIMAL(12, 2),
    CONSTRAINT fk_building FOREIGN KEY (building_id) REFERENCES BUILDING(id) ON DELETE CASCADE
);

-- Criação da tabela AMENITY
-- Nota: parent_amenity_id permite a autorreferência para sub-amenidades
CREATE TABLE AMENITY (
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

-- Criação da tabela AMENITY_CONFIGURATION
CREATE TABLE AMENITY_CONFIGURATION (
    id SERIAL PRIMARY KEY,
    amenity_id INT NOT NULL,
    key VARCHAR(100) NOT NULL,
    value TEXT,
    reservable BOOLEAN DEFAULT FALSE,
    image_url TEXT,
    CONSTRAINT fk_config_amenity FOREIGN KEY (amenity_id) REFERENCES AMENITY(id) ON DELETE CASCADE
);

-- Criação da tabela SUBMISSION
CREATE TABLE SUBMISSION (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    file_path TEXT NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_submission_customer FOREIGN KEY (customer_id) REFERENCES CUSTOMER(id) ON DELETE CASCADE
);