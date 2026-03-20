# Docker - Execucao e Testes (3-tier)

Este documento descreve exatamente como subir e validar a aplicacao usando Docker Compose.

## 1) Visao geral da arquitetura
- **Frontend (Angular + Nginx)**: servido no `http://localhost/` (Nginx escuta na porta **80**)
- **Backend (Node.js + Express + TS)**: servido no `http://localhost:3000/` (porta **3000**)
- **Banco (PostgreSQL)**: porta **5432**
- **Rede do Compose**: rede customizada `app-network`
- **Proxy do Nginx**: o Nginx do frontend encaminha:
  - `POST /upload` e `GET/POST /auth` (se existirem rotas no backend) para `http://backend:3000`

## 2) Arquivos relevantes (ja no repositorio)
- `docker-compose.yml` (PROD)
- `docker-compose.dev.yml` (DEV)
- `backend/Dockerfile.prod` + `backend/Dockerfile.dev`
- `frontend/Dockerfile.prod` + `frontend/Dockerfile.dev`
- `frontend/nginx.conf` (proxy do Nginx)
- `.env` (variaveis de ambiente para o Compose)

## 3) Requisitos
- Docker Desktop instalado e rodando
- Docker Compose disponivel (`docker-compose version`)
- Portas livres: `80`, `3000`, `5432`

## 4) Variaveis de ambiente
- O Compose usa o arquivo `.env` na raiz.
- Variaveis esperadas para o backend e Postgres:
  - `DB_USER`, `DB_HOST`, `DB_DATABASE`, `DB_PASSWORD`, `DB_PORT`, `DB_SSL`
  - `JWT_SECRET`, `JWT_EXPIRES_IN`

## 5) Como subir (comando unico da atividade)
### 5.1) PROD (multi-stage)
No diretorio raiz do projeto:
```bash
docker-compose up --build
```

O Compose sobe:
- `postgres`
- `backend` (em `http://localhost:3000`)
- `frontend` (em `http://localhost`)

### 5.2) DEV (quando necessario)
```bash
docker-compose -f docker-compose.dev.yml up --build
```

## 6) Como parar/remover containers
### PROD
```bash
docker-compose down
```

### DEV
```bash
docker-compose -f docker-compose.dev.yml down
```

## 7) Testes (faça nesta ordem)
> Observacao: se algum teste falhar, verifique os logs do backend/ postgresql (secao 8).

### Teste 1: Containers estao “up”
```bash
docker-compose ps
```
Esperado: `postgres`, `backend`, `frontend` com status **Up**.

### Teste 2: Frontend esta respondendo
Abra no navegador:
- `http://localhost/`

Opcional (curl):
```powershell
curl.exe -I http://localhost/ --max-time 5
```
Esperado: `HTTP/1.1 200 OK` (html).

### Teste 3: Backend esta respondendo
```powershell
curl.exe -I http://localhost:3000/ --max-time 5
```
Esperado: `HTTP/1.1 200 OK` (JSON).

### Teste 4 (OBRIGATORIO): Upload funcionando via tela (rota /upload)
1. No browser, acesse `http://localhost/`
2. Selecione um arquivo **CSV / XLSX / XLS** em `src/uploads/` (qualquer um serve)
3. Clique em **fazerUpload** (botao da tela)
4. Verifique se aparece a mensagem:
   - `Upload completed successfully!`

Se o upload concluir com sucesso, isso valida tambem:
- Nginx proxy para `backend:3000`
- Multer salvando arquivo
- Persistencia no banco

### Teste 5 (alternativo): Upload via curl (mesma rota)
Escolha um arquivo de exemplo em `src/uploads/`:
```powershell
$f = Get-ChildItem "src/uploads" | Select-Object -First 1
$path = $f.FullName
curl.exe -s -o /dev/null -w "%{http_code}`n" `
  -X POST "http://localhost/upload" `
  -F ("file=@$path") `
  -F "customer_id=1" `
  -F "status=pending"
```
Esperado: `200`

## 8) Logs para depuracao (se algo falhar)
Backend:
```bash
docker-compose logs backend --tail=80
```

Postgres:
```bash
docker-compose logs postgres --tail=80
```

Frontend (Nginx):
```bash
docker-compose logs frontend --tail=80
```

## 9) Ajustes de performance para apresentacao (memoria/CPU)
No arquivo `docker-compose.yml` (PROD) foram definidos limites aproximados para rodar em maquinas menores:
- `backend`: `mem_limit: 128m`, `cpus: 0.5`
- `frontend`: `mem_limit: 128m`, `cpus: 0.5`
- `postgres`: `mem_limit: 256m`, `cpus: 0.5`

