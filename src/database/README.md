# Database Structure and Environment Setup

This document describes the database layer of the project, following the documentation style used in `docs` and reflecting the current implementation in `src/database`.

---

## Table of Contents

- [Overview](#overview)
- [Data Layer Architecture](#data-layer-architecture)
- [Folder and File Structure](#folder-and-file-structure)
- [Relational Model and Rules](#relational-model-and-rules)
  - [Entities and Tables](#entities-and-tables)
  - [Relationships](#relationships)
  - [Referential Integrity Policies](#referential-integrity-policies)
- [Environment Setup](#environment-setup)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Database Connection](#database-connection)
- [Initialization and Seeding](#initialization-and-seeding)
- [Transaction Traceability (Audit)](#transaction-traceability-audit)
- [Transaction Rollback](#transaction-rollback)
- [Operational Best Practices](#operational-best-practices)
- [Troubleshooting](#troubleshooting)
- [References](#references)

---

## Overview

The database layer uses **PostgreSQL** and was designed to support:

- customer records (`CUSTOMER`);
- building and floor management (`BUILDING`, `FLOOR`);
- hierarchical physical spaces (`AMENITY`);
- flexible per-space settings (`AMENITY_CONFIGURATION`);
- customer file/project submissions (`SUBMISSION`);
- transaction-level traceability for audit and rollback (`audit.*`).

The setup is designed to be simple for development, using a single bootstrap command (`npm run startDB`) while keeping a clear separation between schema creation, seed loading, and audit mechanisms.

---

## Data Layer Architecture

Data flow in the backend:

`Routes -> Controllers -> Services -> Models -> PostgreSQL`

Inside this repository, the database layer lives in `src/database` and is consumed by the backend through `pg` pools:

- `src/database/config/db.ts`: main connection pool;
- `src/database/runDB/init.ts`: schema + seed + audit bootstrap;
- versioned SQL scripts for creation and operations.

---

## Folder and File Structure

```text
src/database/
|
|- config/
|  |- db.ts
|
|- runDB/
|  |- 01_create_database.sql
|  |- 02_initial_data.sql
|  |- 03_transaction_traceability.sql
|  |- rollback.sql
|  |- init.ts
|  |- README.md
|
|- readme.md
```

### Responsibility of Main Files

| File | Purpose |
|---|---|
| `config/db.ts` | Configures and exports the `pg` `Pool`, using environment variables and optional SSL support. |
| `runDB/01_create_database.sql` | Creates domain tables and constraints (PK/FK). |
| `runDB/02_initial_data.sql` | Inserts initial data for development/testing. |
| `runDB/03_transaction_traceability.sql` | Creates `audit` schema, tables, and triggers to track row-level changes by `txid`. |
| `runDB/rollback.sql` | Reverts one specific transaction based on the audit log. |
| `runDB/init.ts` | Runs SQL scripts in the required order and prevents basic seed duplication. |

---

## Relational Model and Rules

### Entities and Tables

#### 1) `CUSTOMER`
Represents the client that owns buildings and submits files.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `SERIAL` | PK | Unique identifier |
| `name` | `VARCHAR(255)` | NOT NULL | Customer name |
| `email` | `VARCHAR(255)` | NOT NULL | Contact email |
| `modules_enabled` | `JSONB` | - | Enabled product modules |

#### 2) `BUILDING`
Buildings linked to a customer.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `SERIAL` | PK | Identifier |
| `customer_id` | `INT` | FK, NOT NULL | References `CUSTOMER(id)` |
| `name` | `VARCHAR(255)` | NOT NULL | Building name |
| `type` | `VARCHAR(100)` | - | Building category |
| `address` | `TEXT` | - | Address |
| `number_of_floors` | `INT` | - | Number of floors |
| `total_area` | `DECIMAL(12,2)` | - | Total area |
| `images_url` | `JSONB` | - | Image URL list |

#### 3) `FLOOR`
Floors that belong to a building.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `SERIAL` | PK | Identifier |
| `building_id` | `INT` | FK, NOT NULL | References `BUILDING(id)` |
| `floor_number` | `INT` | NOT NULL | Floor number |
| `floor_area` | `DECIMAL(12,2)` | - | Floor area |

#### 4) `AMENITY`
Usable physical spaces, with hierarchical support.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `SERIAL` | PK | Identifier |
| `building_id` | `INT` | FK, NOT NULL | References `BUILDING(id)` |
| `floor_id` | `INT` | FK, optional | References `FLOOR(id)` |
| `parent_amenity_id` | `INT` | FK, optional | Self-reference for sub-spaces |
| `name` | `VARCHAR(255)` | NOT NULL | Space name |
| `type` | `VARCHAR(100)` | - | Space type |
| `capacity` | `INT` | - | Capacity |
| `area_m2` | `DECIMAL(10,2)` | - | Area in m2 |
| `images_url` | `JSONB` | - | Image list |

#### 5) `AMENITY_CONFIGURATION`
Dynamic amenity settings (key/value + reservable + image).

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `SERIAL` | PK | Identifier |
| `amenity_id` | `INT` | FK, NOT NULL | References `AMENITY(id)` |
| `key` | `VARCHAR(100)` | NOT NULL | Configuration key |
| `value` | `TEXT` | - | Configuration value |
| `reservable` | `BOOLEAN` | DEFAULT FALSE | Reservation flag |
| `image_url` | `TEXT` | - | Optional configuration image |

#### 6) `SUBMISSION`
Tracks customer file submissions.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `SERIAL` | PK | Identifier |
| `customer_id` | `INT` | FK, NOT NULL | References `CUSTOMER(id)` |
| `status` | `VARCHAR(50)` | DEFAULT `'pending'` | Submission status |
| `file_path` | `TEXT` | NOT NULL | File path/URL |
| `upload_date` | `TIMESTAMP` | DEFAULT CURRENT_TIMESTAMP | Upload timestamp |

### Relationships

| Source | Target | Cardinality | Description |
|---|---|---|---|
| `CUSTOMER` | `BUILDING` | 1:N | A customer owns multiple buildings |
| `BUILDING` | `FLOOR` | 1:N | A building has multiple floors |
| `BUILDING` | `AMENITY` | 1:N | A building has multiple amenities |
| `FLOOR` | `AMENITY` | 1:N (optional in `AMENITY`) | An amenity may exist without a floor |
| `AMENITY` | `AMENITY` | 1:N | Space/sub-space hierarchy |
| `AMENITY` | `AMENITY_CONFIGURATION` | 1:N | Per-space configuration entries |
| `CUSTOMER` | `SUBMISSION` | 1:N | Submission history per customer |

### Referential Integrity Policies

| FK | ON DELETE action | Practical effect |
|---|---|---|
| `BUILDING.customer_id -> CUSTOMER.id` | `CASCADE` | Deleting a customer removes dependent buildings |
| `FLOOR.building_id -> BUILDING.id` | `CASCADE` | Deleting a building removes floors |
| `AMENITY.building_id -> BUILDING.id` | `CASCADE` | Deleting a building removes amenities |
| `AMENITY.floor_id -> FLOOR.id` | `SET NULL` | Amenity can remain without floor assignment |
| `AMENITY.parent_amenity_id -> AMENITY.id` | `CASCADE` | Deleting parent amenity removes child amenities |
| `AMENITY_CONFIGURATION.amenity_id -> AMENITY.id` | `CASCADE` | Deleting amenity removes its configurations |
| `SUBMISSION.customer_id -> CUSTOMER.id` | `CASCADE` | Deleting customer removes submissions |

---

## Environment Setup

### Prerequisites

- Node.js `18+`
- npm
- PostgreSQL `15+` (recommended)
- Project dependencies installed (`npm install`)

### Environment Variables

Create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_DATABASE=your_database
DB_PORT=5432
```

### Database Connection

The backend uses `pg` (`Pool`) connections.

- Main connection file: `src/database/config/db.ts`
- Bootstrap/seed file: `src/database/runDB/init.ts`

---

## Initialization and Seeding

To create schema, enable auditing, and insert initial data:

```bash
npm install
npm run startDB
```

`startDB` executes:

1. `01_create_database.sql`
2. `03_transaction_traceability.sql`
3. `02_initial_data.sql` (only when baseline seed data is missing)

Important behavior:

- The script performs a simple duplicate check before seeding (looks for building named `Edifício Inovação`).
- If the database is partially initialized, some object-already-exists warnings may occur, though `IF NOT EXISTS` reduces conflicts.

---

## Transaction Traceability (Audit)

Auditing is created under the `audit` schema and records:

- one row per transaction in `audit.transaction_trace`;
- one row per data change in `audit.row_change`;
- operation (`I`, `U`, `D`), table, PK, `old_data`, `new_data`, user, and `application_name`.

### How to correlate a business operation to a `txid`

Before running a transaction:

```sql
SET application_name = 'CORRELATION-123';
```

Then query:

```sql
SELECT txid, application_name, changed_by, started_at
FROM audit.transaction_trace
ORDER BY started_at DESC
LIMIT 50;
```

---

## Transaction Rollback

The script `runDB/rollback.sql` reverts all effects from a specific transaction using its `txid`.

Example with `psql`:

```powershell
psql -d your_database -v txid=123456789 -f src/database/runDB/rollback.sql
```

Execution details:

- Rollback processes row changes in reverse order to better respect FK dependencies.
- The session sets `SET LOCAL application_name = 'AUDIT_BYPASS'` to avoid generating new audit entries during compensation.
- If the `txid` does not exist in `audit.transaction_trace`, execution fails with an explicit error.

---

## Troubleshooting

### PostgreSQL authentication error

- Check `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, and access rules in `pg_hba.conf`.

### `npm run startDB` connection failure

- Confirm PostgreSQL service is running.
- Test connection with `psql` using the same `.env` values.

### Seed does not run again

- Expected behavior: seed duplication protection skips seed when baseline data already exists.

### Existing object errors

- Some scripts use `IF NOT EXISTS`; in inconsistent environments, controlled manual adjustment may still be required.

### Rollback cannot find `txid`

- Confirm the original transaction ran with audit enabled and `audit.*` tables were not cleaned.

---

