# Read this to Understand the Database configuration and how to copy it

This folder contains the official physical schema, data dictionary, and initialization scripts for the project's database. This implementation uses raw SQL for maximum performance and compatibility.

---

## 1.0 - Deployment and Configuration


## Database Version

- PostgreSQL 15+ (recommended)

## Dependencies

- Node.js 18+
- ts
- npm
- pg (node-postgres)
- dotenv

Install dependencies:

```bash
npm install
```
### Setup Instructions
1.  **Environment Variables:** Create a `.env` file in the project root with the following keys:
    ```env
    DB_HOST=your_host
    DB_USER=your_username
    DB_PASSWORD=your_password
    DB_DATABASE=your_db
    DB_PORT=5432
    ```
2.  **Schema Creation and seeding:** Run the script `npm run startDB`. This will generate all tables, primary keys, and foreign keys. Also, it's going to populate the DB with some mocked data to test if everything is working as expected. OBS: This script just executes `01_create_database.sql` and `02_initial_data.sql` in the correct order.


---

## 2.0 - Data Dictionary


### 1. Table: `CUSTOMER`
**Description:** Stores the client entities who own properties and their system permissions.

| Column | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | SERIAL | PK | Unique identifier for the customer. |
| `name` | VARCHAR(255) | NOT NULL | Full name or company name. |
| `email` | VARCHAR(255) | NOT NULL | Primary contact email. |
| `modules_enabled` | JSONB | - | Dynamic configuration of enabled system modules. |

### 2. Table: `BUILDING`
**Description:** Contains details about physical buildings belonging to a customer.

| Column | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | SERIAL | PK | Unique identifier for the building. |
| `customer_id` | INT | FK (CUSTOMER.id), NOT NULL | Link to the building owner. |
| `name` | VARCHAR(255) | NOT NULL | Name of the building. |
| `type` | VARCHAR(100) | - | Category (e.g., Residential, Commercial). |
| `address` | TEXT | - | Physical address of the building. |
| `number_of_floors` | INT | - | Total count of floors. |
| `total_area` | DECIMAL(12,2) | - | Total square area of the building. |
| `images_url` | JSONB | - | List of image URLs associated with the building. |

### 3. Table: `FLOOR`
**Description:** Represents individual levels within a specific building.

| Column | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | SERIAL | PK | Unique identifier for the floor. |
| `building_id` | INT | FK (BUILDING.id), NOT NULL | The building this floor belongs to. |
| `floor_number` | INT | NOT NULL | The level number. |
| `floor_area` | DECIMAL(12,2) | - | Specific square area of this level. |

### 4. Table: `AMENITY`
**Description:** Facilities or common areas. Supports hierarchical sub-amenities.

| Column | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | SERIAL | PK | Unique identifier for the amenity. |
| `building_id` | INT | FK (BUILDING.id), NOT NULL | Main building link. |
| `floor_id` | INT | FK (FLOOR.id), SET NULL | Specific floor link (optional). |
| `parent_amenity_id`| INT | FK (AMENITY.id), CASCADE | Parent amenity for sub-spaces. |
| `name` | VARCHAR(255) | NOT NULL | Name of the space. |
| `type` | VARCHAR(100) | - | Type of facility (e.g., Gym, Spa). |
| `capacity` | INT | - | Maximum occupancy. |
| `area_m2` | DECIMAL(10,2) | - | Area in square meters. |
| `images_url` | JSONB | - | Gallery of images for the amenity. |

### 5. Table: `AMENITY_CONFIGURATION`
**Description:** Detailed technical settings or booking rules for an amenity.

| Column | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | SERIAL | PK | Unique identifier. |
| `amenity_id` | INT | FK (AMENITY.id), NOT NULL | Associated amenity. |
| `key` | VARCHAR(100) | NOT NULL | Configuration name (e.g., "OpenHours"). |
| `value` | TEXT | - | Configuration value. |
| `reservable` | BOOLEAN | DEFAULT FALSE | Defines if the item can be booked. |
| `image_url` | TEXT | - | Specific image for the configuration item. |

### 6. Table: `SUBMISSION`
**Description:** Records of file uploads or requests sent by customers.

| Column | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | SERIAL | PK | Unique identifier. |
| `customer_id` | INT | FK (CUSTOMER.id), NOT NULL | Submitting customer. |
| `status` | VARCHAR(50) | DEFAULT 'pending' | Current state of the submission. |
| `file_path` | TEXT | NOT NULL | Server path or URL to the file. |
| `upload_date` | TIMESTAMP | DEFAULT NOW() | Timestamp of the submission. |

---

## 3.0 - Relationships Summary

1.  **CUSTOMER 1:N BUILDING:** A customer manages multiple buildings.
2.  **BUILDING 1:N FLOOR:** A building consists of several levels.
3.  **BUILDING 1:N AMENITY:** General amenities tied to a building location.
4.  **FLOOR 0:N AMENITY:** Amenities located on specific floors.
5.  **AMENITY 1:N AMENITY (Self):** Allows creating sub-amenities (hierarchical).
6.  **AMENITY 1:N CONFIGURATION:** Detailed settings for each facility.
7.  **CUSTOMER 1:N SUBMISSION:** Tracking history of customer requests.

---

## 4.0 - File Structure

| File | Purpose |
| :--- | :--- |
| `01_create_database.sql` |  Contains `CREATE TABLE` statements, Constraints (PK/FK), and Indexes. |
| `02_initial_data.sql` |  Contains `INSERT` statements for initial system seeding. |
| `03_transaction_traceability.sql` | Adds audit tables + triggers to capture row-level changes by PostgreSQL transaction (`txid`). |
| `rollback.sql` | Reverts the effects of a given transaction (`txid`) using the captured audit log (compensating SQL). |
| `init.js ` | Contains scripts to run `01_create_database.sql`, `02_initial_data.sql` and `03_transaction_traceability.sql` in the correct order|

---

## 5.0 - Transaction Traceability (Rollback Support)

This project enables *transaction traceability* in PostgreSQL by using an `audit` schema with triggers.
For each write performed on the audited tables, the database stores:

- The PostgreSQL transaction identifier (`txid`)
- Which table and operation happened (`I` / `U` / `D`) (`Insert`/ `Update`/ `Delete`)
- The `OLD` and `NEW` row images (as JSONB) to allow compensating rollback

### 5.1 - How to correlate a business request with a `txid`

Before running your business transaction, set a correlation value for the current session:

```sql
SET application_name = 'CORRELATION-123';
```

After executing your transaction, you can locate it in the audit tables:

```sql
SELECT txid, application_name, changed_by, started_at
FROM audit.transaction_trace
ORDER BY started_at DESC
LIMIT 50;
```

### 5.2 - Rolling back a transaction (`rollback.sql`)

Use the `txid` you want to revert:

```powershell
psql -d seu_db -v txid=123456789 -f src/database/runDB/rollback.sql
```