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

| Table                 | Purpose                             |
| --------------------- | ----------------------------------- |
| CUSTOMER              | Stores system clients               |
| BUILDING              | Buildings owned by a customer       |
| FLOOR                 | Floors within a building            |
| AMENITY               | Shared facilities (gym, pool, etc.) |
| AMENITY_CONFIGURATION | Configuration of amenities          |
| SUBMISSION            | Records file uploads from customers |

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

# Implementações e Correções Recentes

## Endpoints de Autenticação e Perfil de Usuário

### Endpoint `/user/profile`

- **Método**: GET
- **Propósito**: Buscar ou criar automaticamente o perfil de um cliente baseado no email
- **Parâmetros**: `email` (obrigatório), `name` (opcional)
- **Funcionalidade**:
  - Busca cliente existente na tabela `customer` pelo email
  - Se não encontrado, cria automaticamente um novo registro de cliente
  - Retorna `customer_id` e `customer_name`
- **Uso**: Chamado pelo frontend após login via Auth0 para obter o ID do cliente necessário para uploads

### Implementação Técnica

```typescript
// UserController.ts
export async function getProfile(
  req: Request,
  res: Response,
): Promise<Response> {
  const { email, name } = req.query;
  // Busca cliente existente
  const findResult = await db.query(
    "SELECT id, name FROM customer WHERE email = $1",
    [email],
  );

  if (findResult.rows.length > 0) {
    return res.json({
      customer_id: findResult.rows[0].id,
      customer_name: findResult.rows[0].name,
    });
  }

  // Auto-registra novo cliente
  const customerName = name || email.split("@")[0];
  const insertResult = await db.query(
    "INSERT INTO customer (name, email) VALUES ($1, $2) RETURNING id, name",
    [customerName, email],
  );

  return res
    .status(201)
    .json({
      customer_id: insertResult.rows[0].id,
      customer_name: insertResult.rows[0].name,
    });
}
```

## Endpoints do Dashboard

### Endpoint `/dashboard`

- **Método**: GET
- **Autenticação**: Requer JWT (Auth0)
- **Propósito**: Retornar dados do dashboard para o usuário logado
- **Dados retornados**:
  - Informações do usuário (nome, email, auth0_id)
  - Dados do cliente (nome, CNPJ, plano, módulos)
  - Estatísticas (total, pendente, completado, falhado)
  - Lista de submissões recentes

### Endpoint `/dashboard-debug`

- **Método**: GET
- **Propósito**: Endpoint de debug para desenvolvimento (sem autenticação obrigatória)
- **Parâmetros**: `auth0_id` (opcional)
- **Uso**: Usado durante desenvolvimento para testar dados do dashboard

## Endpoint de Upload

### Endpoint `/upload`

- **Método**: POST
- **Autenticação**: Opcional (usa token Auth0 se disponível)
- **Propósito**: Processar upload de arquivos Excel/CSV
- **Campos obrigatórios**: `file`, `customer_id`, `status`
- **Fluxo de processamento**:
  1. Middleware valida campos obrigatórios
  2. Arquivo é processado e armazenado no banco
  3. Dados são extraídos e processados
  4. Retorna confirmação de upload

### Middleware de Upload

- **UploadMiddleware**: Valida campos obrigatórios (`customer_id`, `status`)
- **UploadExcelMiddleware**: Processa arquivos Excel específicos
- **Tratamento de erros**: Retorna mensagens específicas para diferentes tipos de falha

## Configuração de Porta e CORS

### Porta do Servidor

- **Porta configurada**: 3003 (localhost:3003)
- **Configuração**: Definida no arquivo `app.ts`
- **CORS**: Habilitado para permitir requisições do frontend

### Observação Importante

Durante o desenvolvimento, foi identificado e corrigido um problema de inconsistência de portas:

- Frontend estava chamando `localhost:3000` para alguns endpoints
- Backend roda em `localhost:3003`
- **Correção**: Frontend atualizado para usar configuração dinâmica de URL base

## Integração com Auth0

### Middleware de Autenticação

- **AuthMiddleware**: Valida tokens JWT do Auth0
- **Funcionalidades**:
  - Verifica assinatura do token
  - Extrai informações do usuário
  - Disponibiliza dados do usuário para controllers

### Fluxo de Autenticação

1. Usuário faz login via Auth0 no frontend
2. Frontend obtém access token
3. Token é enviado em headers `Authorization: Bearer <token>`
4. Backend valida token e processa requisição

## Tratamento de Erros

### Padrões de Resposta de Erro

- **400**: Campos obrigatórios ausentes
- **401**: Token inválido ou expirado
- **404**: Recurso não encontrado (ex: cliente não existe)
- **500**: Erro interno do servidor

### Logs de Debug

- Todas as requisições são logadas no console
- Erros são registrados com contexto detalhado
- Facilita debugging durante desenvolvimento
