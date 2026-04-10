# Frontend Documentation

This document describes the frontend architecture, implemented pages, backend integration, authentication flow, and testing strategy.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Application Structure](#application-structure)
- [Routing](#routing)
- [Authentication (Auth0)](#authentication-auth0)
- [Implemented Pages and Features](#implemented-pages-and-features)
- [Frontend-Backend Integration](#frontend-backend-integration)
- [Environment and Execution](#environment-and-execution)
- [Testing Strategy](#testing-strategy)
- [Known Gaps and Next Steps](#known-gaps-and-next-steps)

---

## Overview

The frontend is built with Angular (standalone components) and is responsible for:

- rendering the user interface;
- handling user interactions (login, file upload, profile actions);
- calling backend APIs for data persistence and retrieval;
- presenting submission progress and user feedback.

Main frontend directory: `src/frontend`.

---

## Tech Stack

- Angular 21 (standalone component model)
- TypeScript
- Angular Router
- Angular HttpClient
- Auth0 Angular SDK (`@auth0/auth0-angular`)
- SweetAlert2 (upload error feedback)

---

## Application Structure

Core app modules are organized in `src/frontend/src/app`:

| Module          | Responsibility                                 |
| --------------- | ---------------------------------------------- |
| `landingpage`   | Initial page and login trigger                 |
| `upload`        | File upload UI with drag-and-drop and progress |
| `profile`       | Company/profile form and save flow             |
| `app.routes.ts` | Route definitions                              |
| `app.config.ts` | Providers: router, HTTP, Auth0                 |

The frontend follows component-based separation, with API calls executed through `HttpClient` within feature components.

---

## Routing

Current routes (`app.routes.ts`):

| Path         | Component       |
| ------------ | --------------- |
| `/`          | `Landingpage`   |
| `/upload`    | `Upload`        |
| `/profile`   | `Profile`       |
| `**`         | Redirect to `/` |

This setup supports a simple authenticated user journey: landing -> login -> upload/profile.

---

## Authentication (Auth0)

Auth0 is configured in `app.config.ts` via `provideAuth0(...)`.

Current integration includes:

- login redirection from `Landingpage` (`loginWithRedirect`);
- access token retrieval (`getAccessTokenSilently`) in protected API calls;
- logout with redirect to app origin;
- token usage in `Authorization: Bearer <token>` headers.

Production deployment includes HTTPS at frontend proxy level (Nginx + self-signed certificate in `Dockerfile.prod`) to support secure auth flows.

---

## Implemented Pages and Features

### 1) Landing Page

- Presents initial UI and starts login flow.
- Redirects authenticated user flow to `/upload`.



### 3) Upload

- Supports drag-and-drop and file input selection.
- Sends files using `multipart/form-data` to `POST /api/upload`.
- Tracks upload progress via `HttpEventType.UploadProgress`.
- Displays status per file (`uploading`, `done`, `error`).
- Uses SweetAlert2 for user-friendly error feedback.

### 4) Profile

- Displays authenticated user information.
- Submits profile/company form to `POST /api/profile`.
- Includes success/error feedback and basic loading state.

---

## Frontend-Backend Integration

Frontend requests target `/api/*` paths. In production-like deployment, Nginx proxies `/api/` to backend `http://backend:3000/`.

Typical integration flow for upload:

1. User selects a file.
2. `Upload` component builds `FormData`.
3. Access token is requested from Auth0.
4. Request is sent to `POST /api/upload` with optional bearer token.
5. Backend validates and processes upload.
6. Frontend updates progress/state and presents result feedback.

Current API calls from frontend components:

- `POST /api/upload`
- `POST /api/profile`

---

## Environment and Execution

### Local development

From `src/frontend`:

```bash
npm install
npm start
```

Application default URL:

```text
http://localhost:4200
```

For full functionality, backend and database services must also be running.

### Production container behavior

- Angular app is built and served by Nginx.
- Nginx redirects HTTP -> HTTPS.
- `/api/*` requests are proxied to backend service.
- Upload body size is increased in Nginx config (`client_max_body_size 50M`).

---

## Testing Strategy

Frontend tests validate core component behavior and HTTP interaction contracts.

Current examples include:

- `upload.spec.ts`: component creation, drag state, file helpers.
- `profile.spec.ts`: user load on init, POST save flow, success/error states.

Run tests from `src/frontend`:

```bash
npm test
```

Recommended focus for future tests:

- upload integration with HTTP progress events and auth failures;
- template-level interaction tests for routing and forms.

---

## Correções Técnicas e Melhorias

### Problema de Conectividade no Upload (Resolvido)

#### Descrição do Problema

Durante os testes de integração, foi identificado que o componente de upload (`src/frontend/src/app/upload/upload.ts`) apresentava erro "Perfil não encontrado" ao tentar fazer upload de arquivos. O usuário era direcionado corretamente para o sistema após o login via Auth0, mas ao acessar a aba de upload, o sistema falhava ao buscar o perfil do usuário.

#### Causa Raiz

O problema estava na configuração de URLs do backend no componente de upload:

- O upload estava fazendo chamadas para `http://localhost:3000/user/profile` (porta errada)
- Enquanto o backend estava configurado para rodar em `http://localhost:3003`
- Isso causava falha na busca do perfil do usuário, impedindo o upload

#### Solução Implementada

Para resolver a inconsistência, foi adicionada uma configuração dinâmica de URL base no componente de upload:

1. **Adição de propriedade `backendBaseUrl`**:

   ```typescript
   private backendBaseUrl = window.location.hostname === 'localhost' ? 'http://localhost:3003' : '';
   ```

2. **Correção da chamada de perfil**:
   - Antes: `http://localhost:3000/user/profile`
   - Depois: `${this.backendBaseUrl}/user/profile`

3. **Correção do endpoint de upload**:
   - Antes: `http://localhost:3003/upload` (hardcoded)
   - Depois: `${this.backendBaseUrl}/upload`

#### Arquivos Modificados

- `src/frontend/src/app/upload/upload.ts`: Adicionada configuração de URL base e atualização dos endpoints HTTP

#### Impacto

- O upload agora funciona corretamente, permitindo que usuários façam upload de arquivos após o login
- Preparado para produção (a URL base será vazia em produção, usando caminhos relativos)

#### Testes Realizados

- Verificado que o perfil é carregado corretamente após login
- Confirmado que uploads de arquivos .csv e .xlsx funcionam
- Validado que erros de conectividade são tratados adequadamente
