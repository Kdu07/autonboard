# Backend Overview
This document briefly explains how the backend works, how it connects to the database, and how to run the system.


# Architecture
The backend follows a layered architecture:

Routes → Controllers → Services → Models → Database (PostgreSQL)

- **Routes** define the API endpoints.
- **Controllers** handle the request and response logic.
- **Services** contain the main business logic and orchestrate operations.
- **Models** interact directly with the database through SQL queries.
- **Database** stores the system data.

This separation keeps the system **organized, scalable, and easier to maintain**.


# Project Structure

src
│
├── controllers → Handle HTTP requests and responses
├── middleware → Request processing (auth, validation, etc.)
├── models → SQL queries and database interaction
├── services → Business logic layer


Each folder responsibility:

- **controllers**: receives the request from routes and returns the response.
- **middleware**: executes logic before reaching controllers (authentication, validation, etc.).
- **services**: central business logic of the application.
- **models**: responsible for communicating with the PostgreSQL database.


# Database

The system uses PostgreSQL with a relational schema.

Main tables:

| Table | Purpose |
|------|------|
| CUSTOMER | Stores system clients |
| BUILDING | Buildings owned by a customer |
| FLOOR | Floors within a building |
| AMENITY | Shared facilities (gym, pool, etc.) |
| AMENITY_CONFIGURATION | Configuration of amenities |
| SUBMISSION | Records file uploads from customers |

Example relationship structure:


CUSTOMER
│
├── BUILDING
│ └── FLOOR
│
├── AMENITY
│ └── AMENITY_CONFIGURATION
│
└── SUBMISSION


Each **SUBMISSION** stores information about a file uploaded by a customer.


# Database Connection

The backend connects to PostgreSQL using pg (node-postgres) and a connection pool.

Example configuration:

```ts
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export default db;
```
The connection uses environment variables defined in .env.

## Data Interfaces

TypeScript interfaces define the structure of database objects.

## API Routes
The API exposes endpoints using Express.

## Example routes:
- GET / → retrieve submissions
- POST /upload → create a submission

## Example route definition:
```
router.get("/", getAll);
router.post("/upload", create);
Request Flow
```

Example flow for creating a submission:

Client Request
      │
POST /upload
      │
      ▼
Route receives request
      │
      ▼
Controller processes data
      │
      ▼
Service executes business logic
      │
      ▼
Model executes SQL query
      │
      ▼
PostgreSQL stores record
      │
      ▼
Response returned to client
Running the Backend

## Start the backend with:

```
npm run dev
or
npm start
```