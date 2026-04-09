# Backend Documentation

This document explains the backend architecture, environment setup, API routes, upload pipelines, and execution flow.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Backend Folder Structure](#backend-folder-structure)
- [Environment Configuration](#environment-configuration)
- [API Endpoints](#api-endpoints)
- [Request Flows](#request-flows)
- [Database Integration](#database-integration)
- [Authentication](#authentication)
- [Run and Build](#run-and-build)
- [Testing](#testing)
- [Known Limitations and Next Steps](#known-limitations-and-next-steps)

---

## Overview

The backend is an Express + TypeScript API responsible for:

- receiving file uploads (general upload and Excel-focused upload);
- validating and parsing spreadsheet data;
- persisting submission metadata in PostgreSQL;
- providing a structured service/repository flow for Excel processing.

Application entry point: `app.ts`.

---

## Tech Stack

- Node.js + TypeScript
- Express
- PostgreSQL (`pg`)
- Multer (multipart file upload)
- ExcelJS (spreadsheet parsing)
- Auth0 JWT middleware (`express-oauth2-jwt-bearer`)

---

## Architecture

The backend follows a layered structure:

`Routes -> Controllers -> Services -> Models/Repositories -> Database`

- **Routes** define HTTP endpoints and middleware composition.
- **Controllers** validate request-level concerns and shape HTTP responses.
- **Services** contain business rules and orchestration logic.
- **Models** handle SQL persistence for relational data.
- **Repositories** provide abstraction for structured domain objects (Excel mapping pipeline).

This separation improves maintainability, testability, and incremental evolution.

---

## Backend Folder Structure

Main backend directory: `src/backend`.

| Folder         | Responsibility                                                                 |
| -------------- | ------------------------------------------------------------------------------ |
| `controllers`  | HTTP orchestration (`UploadController`, `UploadExcelController`)               |
| `routes`       | Endpoint registration and middleware wiring                                    |
| `middleware`   | Upload validation/parsing and authentication helpers                           |
| `services`     | Business logic (`UploadService`, `UploadExcelService`, Excel pipeline classes) |
| `models`       | SQL-oriented data access (`UploadModel`) and typed domain models               |
| `repositories` | Repository contracts and implementations                                       |
| `errors`       | Normalized HTTP error types                                                    |
| `interfaces`   | Shared TypeScript interfaces                                                   |
| `fetch_api`    | Integrations with external APIs                                                |

---

## Environment Configuration

Create a `.env` file in the project root with the database and auth settings used by backend modules:

```env
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_DATABASE=your_database
DB_PORT=5432
DB_SSL=false

AUTH0_DOMAIN=your-tenant.us.auth0.com
AUTH0_AUDIENCE=https://your-api-audience
```

Notes:

- Database pool is configured in `src/database/config/db.ts`.
- JWT middleware reads `AUTH0_DOMAIN` and `AUTH0_AUDIENCE` from environment variables.
- Without valid DB credentials, upload metadata persistence will fail.

---

## API Endpoints

Current route registration is centralized in `src/backend/routes/index.ts` and mounted in `app.ts` at `/`.

| Method | Path            | Description                                                      |
| ------ | --------------- | ---------------------------------------------------------------- |
| `GET`  | `/`             | Returns submission records (`UploadService.getAll`)              |
| `POST` | `/upload`       | Generic upload flow (CSV/XLS/XLSX) + submission persistence      |
| `POST` | `/upload-excel` | Excel-only pipeline (`.xlsx`, max 10MB), parse/validate/map/save |

## Request Flows

### 1) Generic upload (`POST /upload`)

1. `UploadMiddleware.multerSingle` stores the file on disk.
2. `UploadMiddleware.process` validates required fields (`customer_id`, `status`) and parses spreadsheet data.
3. `UploadController.create` delegates processing to `UploadService`.
4. `UploadService` validates MIME type/size and calls `UploadModel.create`.
5. `UploadModel` inserts the record into `submission`.

### 2) Excel pipeline (`POST /upload-excel`)

1. `uploadExcelSingleFile("file")` validates extension/MIME and size.
2. `UploadExcelController.upload` validates request and calls service.
3. `UploadExcelService` executes:
   - read (`ExcelReader`)
   - parse (`ExcelParser`)
   - validate (`ExcelValidator`)
   - map (`ExcelMapper`)
   - save via repository (`BookableResourceRepository`)
4. Controller returns standardized JSON response (`success`, `data`, `error`).

---

## Database Integration

The backend persists upload submissions in PostgreSQL table `submission`, part of the relational schema documented in `docs/DataModeling.md` and `src/database/readme.md`.

Main persistence operation:

- insert `customer_id`, `status`, `file_path`, `upload_date`.

Database initialization scripts are under `src/database/runDB`, and can be run with:

```bash
npm run startDB
```

---

## Authentication

Backend JWT verification middleware exists in `src/backend/middleware/AuthMiddleware.ts`:

- validates tokens against Auth0 issuer/JWKS;
- uses RS256;
- configured by `AUTH0_DOMAIN` and `AUTH0_AUDIENCE`.

Current routes may not yet enforce JWT on every endpoint by default; security hardening can progressively apply `checkJwt` to protected routes.

---

## Run and Build

From repository root:

```bash
npm install
npm run dev
```

Other common commands:

Default backend port in `app.ts`: `3000`.

---

## Testing

Backend tests are located in `tests/backend` and cover:

- upload controller/service/model;
- upload middlewares;
- Excel parser/reader/mapper pipeline.

Run tests from repository root:

```bash
npm test
```

---

## Known Limitations and Next Steps

- `UploadService` currently logs some errors without always returning structured error responses.
- Excel repository default save behavior returns a cloned object (placeholder) unless a concrete DB adapter is injected.
- Route-level auth enforcement can be expanded to protect all sensitive endpoints.
- API contracts for `/profile`, `/dashboard`, and related features should be documented once fully consolidated in backend routes.

---

## Implementações e Correções Recentes

### Endpoints de Autenticação e Perfil de Usuário

#### Endpoint `/user/profile`

- **Método**: GET
- **Propósito**: Buscar ou criar automaticamente o perfil de um cliente baseado no email
- **Parâmetros**: `email` (obrigatório), `name` (opcional)
- **Funcionalidade**:
  - Busca cliente existente na tabela `customer` pelo email
  - Se não encontrado, cria automaticamente um novo registro de cliente
  - Retorna `customer_id` e `customer_name`
- **Uso**: Chamado pelo frontend após login via Auth0 para obter o ID do cliente necessário para uploads

#### Implementação Técnica

```typescript
// UserController.ts
export async function getProfile(
  req: Request,
  res: Response,
): Promise<Response> {
  const { email, name } = req.query;

  if (!email) {
    return res
      .status(400)
      .json({ error: "Email is required to fetch profile." });
  }

  const findResult = await db.query(
    "SELECT id, name FROM customer WHERE email = $1 LIMIT 1",
    [email],
  );

  if (findResult.rows.length > 0) {
    return res.status(200).json({
      customer_id: findResult.rows[0].id,
      customer_name: findResult.rows[0].name,
    });
  }

  // Auto-register customer for first-time login (e.g. Google social login)
  const customerName = (name as string) || (email as string).split("@")[0];
  const insertResult = await db.query(
    "INSERT INTO customer (name, email) VALUES ($1, $2) RETURNING id, name",
    [customerName, email],
  );

  console.log(`[UserController] New customer auto-registered: ${email}`);

  return res.status(201).json({
    customer_id: insertResult.rows[0].id,
    customer_name: insertResult.rows[0].name,
  });
}
```

### Endpoints do Dashboard

#### Endpoint `/dashboard`

- **Método**: GET
- **Autenticação**: Requer JWT (Auth0)
- **Propósito**: Retornar dados do dashboard para o usuário logado
- **Dados retornados**:
  - Informações do usuário (nome, email, auth0_id)
  - Dados do cliente (nome, CNPJ, plano, módulos)
  - Estatísticas (total, pendente, completado, falhado)
  - Lista de submissões recentes

#### Endpoint `/dashboard-debug`

- **Método**: GET
- **Propósito**: Endpoint de debug para desenvolvimento (sem autenticação obrigatória)
- **Parâmetros**: `auth0_id` (opcional)
- **Uso**: Usado durante desenvolvimento para testar dados do dashboard

### Endpoint de Upload

#### Endpoint `/upload`

- **Método**: POST
- **Autenticação**: Opcional (usa token Auth0 se disponível)
- **Propósito**: Processar upload de arquivos Excel/CSV
- **Campos obrigatórios**: `file`, `customer_id`, `status`
- **Fluxo de processamento**:
  1. Middleware valida campos obrigatórios
  2. Arquivo é processado e armazenado no banco
  3. Dados são extraídos e processados
  4. Retorna confirmação de upload

#### Middleware de Upload

- **UploadMiddleware**: Valida campos obrigatórios (`customer_id`, `status`)
- **UploadExcelMiddleware**: Processa arquivos Excel específicos
- **Tratamento de erros**: Retorna mensagens específicas para diferentes tipos de falha

### Configuração de Porta e CORS

#### Porta do Servidor

- **Porta configurada**: 3003 (localhost:3003)
- **Configuração**: Definida no arquivo `app.ts`
- **CORS**: Habilitado para permitir requisições do frontend

#### Observação Importante

Durante o desenvolvimento, foi identificado e corrigido um problema de inconsistência de portas:

- Frontend estava chamando `localhost:3000` para alguns endpoints
- Backend roda em `localhost:3003`
- **Correção**: Frontend atualizado para usar configuração dinâmica de URL base

### Integração com Auth0

#### Middleware de Autenticação

- **AuthMiddleware**: Valida tokens JWT do Auth0
- **Funcionalidades**:
  - Verifica assinatura do token
  - Extrai informações do usuário
  - Disponibiliza dados do usuário para controllers

#### Fluxo de Autenticação

1. Usuário faz login via Auth0 no frontend
2. Frontend obtém access token
3. Token é enviado em headers `Authorization: Bearer <token>`
4. Backend valida token e processa requisição

### Tratamento de Erros

#### Padrões de Resposta de Erro

- **400**: Campos obrigatórios ausentes
- **401**: Token inválido ou expirado
- **404**: Recurso não encontrado (ex: cliente não existe)
- **500**: Erro interno do servidor

#### Logs de Debug

- Todas as requisições são logadas no console
- Erros são registrados com contexto detalhado
- Facilita debugging durante desenvolvimento
