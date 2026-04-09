# G01 - Autonboard

Sistema de processamento e análise de dados de imóveis para gestão de condomínios.

## 🚀 Tecnologias

- **Backend**: Node.js + Express + TypeScript
- **Frontend**: Angular + Auth0
- **Banco**: PostgreSQL
- **Testes**: Jest
- **Container**: Docker

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL 13+
- Docker (opcional)

## 🛠️ Instalação e Execução

### 1. Clonar o repositório
```bash
git clone https://git.inteli.edu.br/graduacao/2026-1a/t17/g01.git
cd g01
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar banco de dados
```bash
# Iniciar PostgreSQL via Docker
docker-compose up -d

# Ou iniciar manualmente
npm run startDB
```

### 4. Configurar variáveis de ambiente
```bash
cp .env.example .env
# Editar .env com suas configurações
```

### 5. Executar aplicação
```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Com cobertura
npm run test:coverage

# Modo watch
npm run test:watch
```

## 📁 Estrutura do Projeto

```
src/
├── backend/
│   ├── controllers/     # Lógica dos endpoints
│   ├── middleware/      # Middlewares Express
│   ├── models/         # Queries do banco
│   ├── routes/         # Definição das rotas
│   └── services/       # Regras de negócio
├── database/
│   ├── config/         # Conexão PostgreSQL
│   └── runDB/          # Scripts de inicialização
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── dashboard/    # Dashboard do usuário
    │   │   └── upload/       # Upload de arquivos
    │   └── assets/
    └── public/
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa backend em modo desenvolvimento
- `npm run build` - Compila TypeScript
- `npm run start` - Executa aplicação compilada
- `npm run test` - Executa testes
- `npm run test:coverage` - Testes com relatório de cobertura
- `npm run startDB` - Inicializa banco de dados

## 📚 Documentação

- [Frontend](./docs/Frontend.md) - Funcionalidades e desenvolvimento frontend
- [Backend](./docs/Backend.md) - Arquitetura e APIs do backend
- [Modelo de Dados](./docs/DataModeling.md) - Estrutura do banco de dados

## 🔐 Autenticação

O sistema utiliza Auth0 para autenticação de usuários. Após o login, os usuários podem fazer upload de arquivos Excel/CSV para processamento.

## 📊 Funcionalidades

- ✅ Upload de arquivos Excel/CSV
- ✅ Processamento automático de dados
- ✅ Dashboard com estatísticas
- ✅ Gestão de perfis de usuário
- ✅ API RESTful

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC.
