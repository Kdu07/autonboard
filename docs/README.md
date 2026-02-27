# Read this to Understand the Project's Folder Structure

project-root/
│
├── src/
│   │
│   ├── frontend/
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   ├── hooks/
│   │   │   └── styles/
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
    
## **Architectural Rationale**

This project adopts a 3 layer architecture combined with MVC principles to ensure a clear separation of concerns.

The backend is structured into controllers, services, and models to enforce responsibility boundaries:

* Controllers handle only HTTP orchestration.

* Services encapsulate business logic.

* Models represent domain entities and persistence rules.

This separation reduces coupling between components and increases cohesion within each module.

By isolating business logic in the service layer, the system becomes:

* Easier to test (services can be unit tested independently)

* More scalable (business rules can evolve without affecting controllers)

* More maintainable (clear boundaries prevent logic leakage)

The database layer is separated to ensure that persistence concerns do not interfere with domain logic. This abstraction allows future changes in storage technology ( migrating from SQL to NoSQL) without impacting higher layers.

The frontend is fully isolated from backend implementation details, interacting only through defined APIs. This guarantees independence of deployment and future extensibility (e.g., adding a mobile client).

The naming convention follows domain-driven clarity, ensuring that files reflect their bounded responsibility (e.g., BuildingController, BuildingService). This improves readability and long-term maintainability.

Overall, this structure supports scalability, modular growth, independent testing, and clean dependency flow.

This structure allows horizontal scalability of the backend and independent frontend deployment. Additionally, the service layer can later be refactored into microservices if the system grows in complexity and this scalability is designed by creating for each file inside the folders a domain responsibility that in the future can be translated to microservices.
