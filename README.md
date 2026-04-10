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
│   │   │   │   ├── landingpage/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── upload/
│   │   │   │   ├── profile/
│   │   │   │   ├── app.routes.ts
│   │   │   │   └── app.config.ts
│   │   │   │   
│   │   │   ├── index.html
│   │   │   └── main.ts
│   │   │   
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── backend/
│   │   ├── controllers/
│   │   │   ├── UserController.ts
│   │   │   ├── UploadController.ts
│   │   │   ├── UploadExcelController.ts
│   │   │   ├── AmenityController.ts
│   │   │   ├── BuildingController.ts
│   │   │   ├── FloorController.ts
│   │   │   ├── CustomerController.ts
│   │   │   ├── SubmissionController.ts
│   │   │   └── UsersController.ts
│   │   │
│   │   ├── services/
│   │   │   ├── UploadService.ts
│   │   │   ├── UploadExcelService.ts
│   │   │   └── Excel pipeline classes
│   │   │
│   │   ├── models/
│   │   │   ├── Amenity.ts
│   │   │   ├── Building.ts
│   │   │   ├── Floor.ts
│   │   │   ├── Customer.ts
│   │   │   ├── Submission.ts
│   │   │   └── UploadModel.ts
│   │   │
│   │   ├── middleware/
│   │   │   ├── AuthMiddleware.ts
│   │   │   ├── ErrorHandlingMiddleware.ts
│   │   │   └── Upload validation middleware
│   │   │
│   │   ├── repositories/
│   │   │   └── Repository abstractions
│   │   │
│   │   ├── errors/
│   │   │   └── HttpError.ts
│   │   │
│   │   ├── interfaces/
│   │   │   └── db.interfaces.ts
│   │   │
│   │   ├── routes/
│   │   │   └── index.ts
│   │   │
│   │   ├── fetch_api/
│   │   │   ├── locationHierarchy.ts
│   │   │   ├── idenitity&access.ts
│   │   │   ├── bookings.ts
│   │   │   └── tenants.ts
│   │   │
│   │   ├── app.ts
│   │   └── README.md
│   │
│   └── database/
│       ├── config/
│       │   └── db.ts
│       ├── runDB/
│       │   └── init.ts
│       └── readme.md
│
├── tests/
│   ├── backend/
│   │   ├── ExcelMapper.test.ts
│   │   ├── ExcelParser.test.ts
│   │   ├── UploadController.test.ts
│   │   ├── UploadService.test.ts
│   │   └── other test files
│   └── frontend/
│       ├── upload.spec.ts
│       └── other test files
│
├── docs/
│   ├── Project.md
│   ├── Backend.md
│   ├── Frontend.md
│   ├── DataModeling.md
│   ├── CodingStandards.md
│   ├── ConfigurationManagement.md
│   └── other documentation
│
└── assets/
    ├── coverage/
    ├── uploads/
    └── sample files/
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

- POST /api/upload  
- POST /api/profile  

---

## Testing

Backend running at: http://localhost:3003

### Frontend

```bash
cd src/frontend
npm install
npm start
```

Frontend running at: Routes → Controllers → Services → Models → Database  

---

## 🗃 Release History

| Day | Year | Description |
|--------|------|------------|
| 10/04 | 2026 | Final + presentation |
| 27/03 | 2026 | Docker + production setup |
| 13/03 | 2026 | Auth0 |
| 27/02| 2026 | Upload |
| 13/02 | 2026 | Initial system |

---

## � Documentation

### Project Documentation

- **[Project.md](./docs/Project.md)** - Test plans, execution records, and feature development documentation
- **[Backend.md](./docs/Backend.md)** - Backend architecture, API endpoints, and implementation details
- **[Frontend.md](./docs/Frontend.md)** - Frontend architecture, components, and integration
- **[DataModeling.md](./docs/DataModeling.md)** - Database schema and data modeling decisions
- **[CodingStandards.md](./docs/CodingStandards.md)** - Code style guidelines and best practices
- **[ConfigurationManagement.md](./docs/ConfigurationManagement.md)** - Configuration and deployment management

### Contributing Guidelines

#### Getting Started

1. Fork the repository
2. Clone your forked repository locally
3. Create a new branch for your feature or bugfix
4. Make your changes
5. Commit with clear, meaningful messages
6. Push to your forked repository
7. Submit a Pull Request to the main repository

#### Development Setup

**Prerequisites:**
- Node.js >= 18
- npm >= 9
- PostgreSQL
- Docker Desktop (optional)

**Setup Instructions:**
```bash
# Clone the repository
git clone https://git.inteli.edu.br/graduacao/2026-1a/t17/g01.git
cd g01

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Start database
npm run startDB

# Run development server
npm run dev

# For frontend development
cd src/frontend
npm install
npm start
```

#### Coding Standards

All code must follow the standards defined in [docs/CodingStandards.md](./docs/CodingStandards.md).

**Key Guidelines:**
- Use TypeScript for all new code
- Follow PascalCase for class names
- Follow camelCase for function and variable names
- Write meaningful commit messages
- Keep functions focused and single-responsibility
- Add JSDoc comments for complex logic
- Include tests for new features

#### Commit Guidelines

Use conventional commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Build process, dependencies, tools

**Examples:**
```
feat(upload): add drag-and-drop support for file uploads
fix(auth): resolve token expiration handling in dashboard
docs: update README with new API endpoints
```

### Code of Conduct

#### Our Commitment

Autonboard project is committed to providing a welcoming and inspiring community for all, regardless of background, identity, or experience level. We are dedicated to providing a harassment-free experience for everyone, regardless of gender, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, or nationality.

#### Our Standards

Examples of behavior that contributes to creating a positive environment include:
- Using welcoming and inclusive language
- Being respectful of differing opinions, viewpoints, and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members
- Helping others learn and grow

Examples of unacceptable behavior include:
- The use of sexualized language or imagery and unwelcome sexual attention or advances
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission (doxing)
- Other conduct which could reasonably be considered inappropriate in a professional setting

#### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the project team. All complaints will be reviewed and investigated promptly and fairly.

---

## 🔒 Security

### Security Measures Implemented

#### Authentication & Authorization
- **Auth0 Integration**: Secure OAuth 2.0 authentication
- **JWT Tokens**: RS256 algorithm for token signing
- **HTTPS Only**: All communications must use encrypted connections in production
- **CORS Policy**: Strict Cross-Origin Resource Sharing configuration

#### Data Protection
- **Environment Variables**: Sensitive credentials stored securely in `.env` files
- **Input Validation**: Validation on both frontend and backend
- **SQL Injection Prevention**: Parameterized queries via PostgreSQL driver
- **XSS Protection**: Angular's built-in XSS protection and HTML sanitization

#### Infrastructure Security
- **Helmet.js**: HTTP security headers implementation
- **Multer Configuration**: Secure file upload handling with size limits
- **Rate Limiting**: Recommended for production deployments

### Security Best Practices

#### For Developers
1. **Never commit secrets** - Use environment variables
2. **Validate all inputs** - Prevent injection attacks
3. **Use HTTPS in production** - Enable SSL/TLS certificates
4. **Keep dependencies updated** - Regular security audits
5. **Implement proper error handling** - Don't expose sensitive information

#### For Deployment
1. **Database Security** - Use strong passwords and SSL connections
2. **File Upload Security** - Validate file types and size limits
3. **Network Security** - Implement firewall rules and monitoring
4. **Access Control** - Principle of least privilege

### Reporting Security Vulnerabilities

If you discover a security vulnerability, please report it responsibly. **Do not** open a public issue for security vulnerabilities.

Send a detailed report to the project maintainers including:
- Steps to reproduce the vulnerability
- Potential impact assessment
- Contact information for follow-up

---

## 📋 License

### Project Information

**Project Name:** Autonboard  
**Institution:** Inteli - Institute of Technology and Leadership  
**Academic Program:** Software Engineering  
**Authors:** Autonboard Group (G01) - 2026/1  

### License Terms

Autonboard is provided as an **academic project** developed by students of Inteli - Institute of Technology and Leadership.

#### Intellectual Property Rights

- All code, documentation, and materials in this repository are the intellectual property of Inteli and the contributing students
- The project is developed as part of the Software Engineering course at Inteli
- This project may be used for academic purposes and educational demonstrations

#### Usage Restrictions

1. **Academic Use Only**: This software is intended for use by:
   - Inteli students and faculty
   - Academic institutions with proper authorization
   - Educational demonstrations and learning purposes

2. **Commercial Use**: 
   - Commercial use is **not permitted** without explicit written authorization from Inteli and all team members
   - Organizations wishing to use this project commercially must contact Inteli

3. **Modifications**:
   - You may modify the code for personal educational use
   - Modified versions must retain this license and attribution
   - All modifications for deployment must follow Inteli approval procedures

4. **Distribution**:
   - Distribution is limited to approved academic contexts
   - Code must not be redistributed without attribution to the original authors

#### Academic Collaboration

- This work may be referenced in academic papers and presentations
- Proper citation to Inteli and the Autonboard Group (G01) is required
- Modifications or adaptations must be credited appropriately

#### Disclaimer

THIS SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:

- The WARRANTIES OF MERCHANTABILITY
- FITNESS FOR A PARTICULAR PURPOSE
- NONINFRINGEMENT OF INTELLECTUAL PROPERTY RIGHTS

IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR:

- ANY CLAIM, DAMAGES, OR OTHER LIABILITY
- WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE
- ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE

#### Data and Security

Users are responsible for:
- Protecting sensitive data (auth tokens, credentials, etc.)
- Ensuring secure deployment in production environments
- Compliance with data protection regulations (LGPD, GDPR, etc.)
- Authentication and authorization enforcement

#### Termination

License can be revoked if:
- The software is used for unauthorized commercial purposes
- Terms of this license are violated
- The software is used in ways that harm individuals or institutions

#### Contact for Licensing

For questions about usage rights, commercial licensing, or authorization requests:
- **Institution:** Inteli - Institute of Technology and Leadership
- **Project Team:** Autonboard Group (G01)

### Team Attribution

Developed by:
- Henrique Milliorini Botti
- Giacomo Zema Matizonkas
- Nicholas Anantha Krishnan Millani
- Carlos Eduardo Serrano Quaglia
- Mirela Schneider Bianchi
- Mariana Pereira de Souza
- Lucas Picinato Rogero

Supervised by:
- Lisane Valdo
- Felipe Gonçalves
- Jefferson de Oliveira
- Afonso Cesar Lelis
- Heloisa Caroline de Souza
- Henrique Mohallem

Advisor: Hermano Peixoto

### Version History

| Date | Version | Description |
|------|---------|-------------|
| April 10, 2026 | 1.0 | Initial license documentation |

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
