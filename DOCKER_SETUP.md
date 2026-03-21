# 🚀 Containerização G01 - Dev & Prod

## 📦 Arquivos Entregues (6 arquivos)

```
✅ Dockerfile.backend.dev       - Backend para desenvolvimento
✅ Dockerfile.backend.prod      - Backend para produção (multi-stage)
✅ Dockerfile.frontend.dev      - Frontend para desenvolvimento
✅ Dockerfile.frontend.prod     - Frontend para produção (multi-stage)
✅ docker-compose.dev.yml       - Orquestração desenvolvimento
✅ docker-compose.prod.yml      - Orquestração produção (otimizado 128MB)
✅ nginx.conf                   - Configuração web server
✅ .env.example                 - Variáveis ambiente
✅ .dockerignore                - Arquivos ignorados build
```

---

## 🎯 Arquitetura

### Desenvolvimento (Dev)

```
docker-compose.dev.yml
├── Frontend: ng serve (4200) - live reload
├── Backend: npm run dev (3000) - hot-reload
├── Database: PostgreSQL (5432) - persistente
└── Hot-reload volumes montados
```

**Comando:**
```bash
docker-compose -f docker-compose.dev.yml up --build
```

**Acesso:**
- Frontend: http://localhost:4200
- Backend: http://localhost:3000
- Database: localhost:5432

### Produção (Prod)

```
docker-compose.prod.yml
├── Frontend: Nginx (80) - estáticos + proxy
├── Backend: Node.js (3000) - otimizado
├── Database: PostgreSQL (5432) - persistente
└── Memory limits: 128MB total
```

**Comando:**
```bash
docker-compose -f docker-compose.prod.yml up --build
```

**Acesso:**
- Frontend: http://localhost
- Backend: http://localhost:3000
- Database: localhost:5432

---

## 📖 Como Usar

### Desenvolvimento (com hot-reload)

```bash
# 1. Iniciar
docker-compose -f docker-compose.dev.yml up --build

# 2. Editar código (auto-reload)
# Frontend recompila em ng serve
# Backend recompila em npm run dev

# 3. Acessar
# Frontend: http://localhost:4200
# Backend: http://localhost:3000

# 4. Logs contínuos
docker-compose -f docker-compose.dev.yml logs -f
```

### Produção (otimizado para 128MB)

```bash
# 1. Preparar ambiente
cp .env.example .env
# Editar .env se necessário

# 2. Build apenas uma vez
docker-compose -f docker-compose.prod.yml build

# 3. Iniciar com memory limits
docker-compose -f docker-compose.prod.yml up
# Vai respeitar 128MB total

# 4. Acessar
# Frontend: http://localhost
# Backend: http://localhost:3000

# 5. Verificar recursos
docker stats
```

### Parar/Remover

```bash
# Dev
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml down -v

# Prod
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml down -v
```

---

## 🔍 Diferenças Dev vs Prod

| Aspecto | Dev | Prod |
|---------|-----|------|
| **Frontend** | ng serve (4200) | Nginx estáticos (80) |
| **Backend** | npm run dev | node dist/app.js |
| **Sourcemaps** | ✅ Sim | ❌ Não |
| **Hot reload** | ✅ Sim | ❌ Não |
| **Memory limit** | Ilimitado | 128MB total |
| **CPU limit** | Ilimitado | 0.5vCPU |
| **Restart** | Manual | unless-stopped |
| **Cache** | Desabilitado | Habilitado |
| **Gzip** | Não | Nível 1 |
| **Health checks** | Básicos | Agressivos |
| **Volumes** | HMR (hot mod reload) | Apenas uploads |

---

## (128MB RAM + 0.5vCPU)

### Script Demonstração

```bash
# 1. Mostrar Dockerfiles
echo "Backend dev e prod são diferentes"
echo "Frontend dev usa ng serve, prod usa nginx"

# 2. Build produção
docker-compose -f docker-compose.prod.yml build

# 3. Iniciar
docker-compose -f docker-compose.prod.yml up

# 4. Monitorar recursos (novo terminal)
docker stats

# 5. Testar aplicação
curl http://localhost           # Frontend
curl http://localhost:3000      # Backend
curl http://localhost:3000/users  # API

# 6. Parar
docker-compose -f docker-compose.prod.yml down
```


## 🚀 Fluxo 

```
1️⃣ DESENVOLVIMENTO
   ├─ docker-compose.dev.yml up
   ├─ Editar código
   ├─ Auto-reload (ng serve + npm run dev)
   └─ Testar localmente

2️⃣ TESTES LOCAIS (Prod-like)
   ├─ docker-compose.prod.yml build
   ├─ docker-compose.prod.yml up
   ├─ Verificar memory/cpu limits
   └─ docker-compose.prod.yml down -v

3️⃣ APRESENTAÇÃO
   ├─ Máquina com 128MB RAM + 0.5vCPU
   ├─ docker-compose.prod.yml up
   ├─ docker stats (mostrar recursos)
   ├─ curl/browser (testar funcionalidade)
```

---

### Antes 

- [ ] Testar dev localmente: `docker-compose -f docker-compose.dev.yml up`
- [ ] Testar prod com memory limits: `docker-compose -f docker-compose.prod.yml up`
- [ ] Verificar docker stats durante execução
- [ ] Confirmar aplicação funciona em 128MB
- [ ] Medir tempo de boot
- [ ] Testar upload de arquivo (se houver)
- [ ] Testar persistência de dados

### Documentação

- [ ] Explicar multi-stage builds
- [ ] Explicar memory limits
- [ ] Mostrar diferenças dev vs prod
- [ ] Mostrar tamanho otimizado
- [ ] Documentar melhorias futuras

---

## 📝 Comandos 

```bash
# Dev
docker-compose -f docker-compose.dev.yml up --build

# Prod build
docker-compose -f docker-compose.prod.yml build

# Prod run
docker-compose -f docker-compose.prod.yml up

# Monitorar recursos
docker stats

# Logs
docker-compose -f docker-compose.prod.yml logs -f

# Parar
docker-compose -f docker-compose.prod.yml down

# Limpar volumes
docker-compose -f docker-compose.prod.yml down -v

# Inspecionar imagem
docker image inspect g01-backend
```

---

## 🔐 Segurança

- ✅ Usuário non-root (nodejs)
- ✅ Alpine Linux (menos vulns)
- ✅ Network isolada
- ✅ Volumes gerenciados
- ✅ Memory/CPU limits

---

## 📊 Hardware Requerido

### Desenvolvimento
- RAM: 2GB+ (recomendado)
- CPU: 2+ cores
- Docker: Desktop

### Apresentação
- RAM: 128MB
- CPU: 0.5vCPU
- Docker: Instalado

### Produção 
- RAM: 512MB-1GB
- CPU: 1 core
- Docker: Docker Swarm/Kubernetes


