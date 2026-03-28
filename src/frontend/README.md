# Project

This repository contains a **full-stack** application composed of **Frontend (Angular)**, **Backend (Node.js/Express)**, **database scripts**, **documentation**, **assets**, and **automated tests**.

---

# Project Structure

```
g01/
│
├── assets/                     # Images, diagrams, and visual resources
│
├── docs/                       # Project documentation
│   ├── Backend.md
│   ├── Frontend.md
│   ├── Project.md
│   ├── CodingStandards.md
│   ├── ConfigurationManagement.md
│   ├── RequirementsCoverage.md
│   └── ...
│
├── src/
│   │
│   ├── backend/                # Express API
│   │   ├── controllers/        # Request controllers
│   │   ├── errors/             # Error handling
│   │   ├── fetch_api/          # External API integrations
│   │   ├── interfaces/         # TypeScript interfaces
│   │   ├── middleware/         # Middlewares
│   │   ├── models/             # Data models
│   │   ├── repositories/       # Data access layer
│   │   ├── routes/             # API routes
│   │   ├── scripts/            # Auxiliary scripts
│   │   ├── services/           # Business logic
│   │   │   └── excel/          # Excel processing pipeline
│   │   └── types/              # Type definitions
│   │
│   ├── database/               # Database configuration and SQL scripts
│   │   ├── config/
│   │   └── runDB/
│   │
│   ├── frontend/               # Angular application
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── landingpage/
│   │   │   │   ├── profile/
│   │   │   │   └── upload/
│   │   │   ├── index.html
│   │   │   ├── main.ts
│   │   │   └── styles.css
│   │   ├── angular.json
│   │   ├── package.json
│   │   ├── Dockerfile.dev
│   │   └── Dockerfile.prod
│   │
│   └── uploads/                # Uploaded CSV and Excel files
│
├── tests/                      # Automated tests
│   ├── backend/
│   ├── frontend/
│   └── benchmark.ts
│
├── app.ts                      # Main application entry point
├── docker-compose.yml
├── docker-compose.prod.yml
├── Dockerfile.dev
├── Dockerfile.prod
├── package.json
├── tsconfig.json
└── README.md
```

---

# Requirements

* Node.js 18 or higher
* npm
* Docker (optional)
* Angular CLI (optional)

---

# Installation

Clone the repository:

```
git clone <repository-url>
cd g01-novo
```

Install dependencies:

```
npm install
```

---

# Running the Project

## Backend

Run the development server:

```
npm run dev
```

The backend will start using **ts-node** or **nodemon**.

---

## Frontend

Navigate to the frontend folder:

```
cd src/frontend
```

Install dependencies:

```
npm install
```

Run the frontend:

```
npm start
```

The Angular application will be available at:

```
http://localhost:4200
```

---

# Docker

Run the full project using Docker:

```
docker-compose up --build
```

Production mode:

```
docker-compose -f docker-compose.prod.yml up --build
```

---

# Tests

Run all tests:

```
npm test
```

Backend tests:

```
npm run test:backend
```

Frontend tests:

```
npm run test:frontend
```

---

# Database

Database scripts are located in:

```
src/database/runDB
```

Includes:

* database creation
* initial data
* transaction traceability
* rollback scripts
* automatic initialization

To initialize:

```
npm run db:init
```

---

# Documentation

All documentation is available in:

```
docs/
```

Includes:

* backend documentation
* frontend documentation
* project management
* requirements coverage
* AWS deployment
* data modeling
* service blueprint

---

# Authors

Project developed by the team.
