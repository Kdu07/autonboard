# Inteli - Institute of Technology and Leadership  

# Autonboard

## 👥 Group Information

**Group:** Autonboard (G01)  
**Course:** Software Engineering — Inteli  
**Path:** graduacao/2026-1a/t17/g01  

---

## 👨‍🎓 Team Members

- <a href="https://www.linkedin.com/in/henrique-botti-6272571a0/">Henrique Milliorini Botti</a>  
- <a href="https://www.linkedin.com/in/giacomo-zema-matizonkas-7ab9072b2/">Giacomo Zema Matizonkas</a>  
- <a href="https://www.linkedin.com/in/nicholas-millani-83a950357/">Nicholas Anantha Krishnan Millani</a>  
- <a href="https://www.linkedin.com/in/carlos-quaglia-309088357/">Carlos Eduardo Serrano Quaglia</a>  
- <a href="https://www.linkedin.com/in/mirela-bianchi-608601254/">Mirela Schneider Bianchi</a>  
- <a href="https://www.linkedin.com/in/mariana-pereira-de-souza1/">Mariana Pereira de Souza</a>  
- <a href="https://www.linkedin.com/in/lucas-picinato-rogero/">Lucas Picinato Rogero</a>

## 👩‍🏫 Professors

- Lisane Valdo  
- Felipe Gonçalves  
- Jefferson de Oliveira  
- Afonso Cesar Lelis  
- Heloisa Caroline de Souza  
- Henrique Mohallem  

---

## 🎓 Advisor

- Hermano Peixoto  

---

## 📜 Project Description

Autonboard is a **data upload and processing platform** designed to streamline onboarding workflows and structured data ingestion.

The system allows users to:

- upload files (CSV, XLS, XLSX);  
- validate and process structured data;  
- visualize results through a dashboard;  
- manage profile and company information;  
- authenticate securely using Auth0.  

The architecture is designed with focus on:

- scalability;  
- modularization;  
- separation of concerns;  
- secure frontend-backend integration.  

---

## 📁 Project Structure

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

---

## ⚙️ Tech Stack

### Frontend
- Angular 21  
- TypeScript  
- Angular Router & HttpClient  
- Auth0 SDK  
- SweetAlert2  

### Backend
- Node.js + TypeScript  
- Express  
- PostgreSQL  
- Multer  
- ExcelJS  
- Auth0 JWT Middleware  

### Infrastructure
- Docker & Docker Compose  
- Nginx  

---

## 🔧 Requirements

- Node.js >= 18  
- npm >= 9  
- Docker Desktop (optional)  
- PostgreSQL  

---

## 🔧 Installation & Execution

### Clone repository

```bash
git clone https://git.inteli.edu.br/graduacao/2026-1a/t17/g01.git
cd g01
```

### Backend

```bash
npm install
npm run dev
```

http://localhost:3000

### Frontend

```bash
cd src/frontend
npm install
npm start
```

http://localhost:4200

### Environment variables

```env
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_DATABASE=your_database
DB_PORT=5432

AUTH0_DOMAIN=your-domain
AUTH0_AUDIENCE=your-audience
```

### Docker

```bash
docker-compose up --build
```

---

## 🔗 API Endpoints

- GET /api/dashboard  
- GET /api/dashboard-debug  
- POST /api/upload  
- POST /api/profile  

---

## Testing

```bash
npm test
```

---

## 📈 Architecture

Layered architecture:

Routes → Controllers → Services → Models → Database  

---

## 🗃 Release History

| Day | Year | Description |
|--------|------|------------|
| 10/04 | 2026 | Final + presentation |
| 27/03 | 2026 | Docker + production setup |
| 13/03 | 2026 | Dashboard + Auth0 |
| 27/02| 2026 | Upload |
| 13/02 | 2026 | Initial system |

---

## 📋 License

Autonboard — Inteli Institute of Technology and Leadership  

Developed by Autonboard Group (G01):  
All team members listed above.  

Academic use only.

---

## 📚 References

- Angular Documentation  
- Node.js Documentation  
- PostgreSQL Documentation  
- Auth0 Documentation  
- ISO/IEC 25010  

---

## ✅ Final Notes

This README reflects the real implementation of the system and follows all repository governance requirements.
