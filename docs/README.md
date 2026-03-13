# Read this to Understand the Project's Folder Structure
```
project-root/
│
├── src/
│   │
│   ├── frontend/
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── landingpage
│   │   │   │   └── upload
│   │   │   │   
│   │   │   ├── index.html
│   │   │   └── main.ts
│   │   │   
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── backend/
│   │   ├── controllers/
│   │   │   ├── BuildingController.cs
│   │   │   ├── TenantController.cs
│   │   │   ├── UploadController.cs
│   │   │   └── ScheduleController.cs
│   │   │
│   │   ├── services/
│   │   │   ├── BuildingService.cs
│   │   │   ├── TenantService.cs
│   │   │   ├── ExcelImportService.cs
│   │   │   └── ScheduleService.cs
│   │   │
│   │   ├── models/
│   │   │   ├── Building.cs
│   │   │   ├── Tenant.cs
│   │   │   ├── Unit.cs
│   │   │   ├── OperationalSchedule.cs
│   │   │   └── DocumentImport.cs
│   │   │
│   │   ├── config/
│   │   │   ├── appsettings.json
│   │   │   └── environment.json
│   │   │
│   │   ├── middleware/
│   │   │   ├── ErrorHandlingMiddleware.cs
│   │   │   └── AuthMiddleware.cs
│   │   │
│   │   ├── Program.cs
│   │   └── README.md
│   │
│   └── database/
│       ├── migrations/
│       ├── seeds/
│       ├── schema.sql
│       └── README.md
│
├── tests/
│   ├── backend/
│   └── frontend/
│
└── assets/
    ├── sample-excel/
    └── diagrams/
```

## Purpose of Each Major Directory

### `/src`

Contains all application source code. The structure is divided to clearly separate frontend, backend, and database responsibilities.

---

### `/src/frontend`

Responsible for the client-side application.

**Subdirectories:**

- **public/** — Static assets served directly by the frontend.
- **src/app/** — Application pages and routing views.

**Rationale:**  
This modular structure promotes component reuse, maintainability, and scalability of the user interface.

### `/src/backend`

Contains the server-side application following a layered architecture.

#### controllers/

Handle HTTP requests and responses only.  
They must not contain business logic.

#### services/

Encapsulate business rules and application use cases.  
This is the core business layer.

#### models/

Represent domain entities and persistence mappings.

#### config/

Application configuration files per environment.

#### middleware/

Cross-cutting concerns such as:

- authentication  
- error handling  
- request pipeline behavior  

#### Program.cs

Application entry point.

**Rationale:**  
This separation enforces the Single Responsibility Principle and keeps business logic isolated and testable.

### `/src/database`

Responsible for persistence-related artifacts.

- **migrations/** — Database schema evolution scripts  
- **seeds/** — Initial data population  
- **schema.sql** — Base database structure  

**Rationale:**  
Isolating database concerns allows future migration to different storage technologies with minimal impact.

### `/tests`

Contains automated tests separated by layer.

- **backend/** — Unit and integration tests for server logic  
- **frontend/** — UI and component tests  

**Rationale:**  
Test separation improves maintainability and supports independent CI pipelines.

### `/assets`

Static project resources.

- **sample-excel/** — Example input files  
- **diagrams/** — UML and architectural diagrams  

**Rationale:**  
Keeps non-code artifacts organized and version-controlled.

## Architectural Rationale

This project adopts a **three-layer architecture combined with MVC principles** to ensure a clear separation of concerns.

The backend is structured into controllers, services, and models to enforce strict responsibility boundaries:

- Controllers handle only HTTP orchestration.
- Services encapsulate business logic.
- Models represent domain entities and persistence rules.

This separation:

- reduces coupling between components  
- increases cohesion within modules  
- improves testability  
- supports long-term scalability  

The database layer is isolated to prevent persistence concerns from leaking into the domain logic. This abstraction enables future migration from SQL to NoSQL without impacting higher layers.

The frontend is fully decoupled from backend implementation details and communicates only through defined APIs, enabling independent deployment and future clients (e.g., mobile applications).

Naming conventions follow domain-driven clarity (e.g., `BuildingController`, `BuildingService`), improving readability and maintainability.


## Scalability Considerations

The current structure supports:

- horizontal backend scaling  
- independent frontend deployment  
- clear modular boundaries  
- future microservice extraction from the service layer  

Each module is organized around a well-defined domain responsibility, allowing gradual evolution toward a distributed architecture if system complexity grows.