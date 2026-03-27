# Deployment Guide — AWS EC2

**Project:** G01 — Autonboard  
**Stack:** Angular 17 · Node.js/TypeScript · PostgreSQL (Supabase)  
**Environment:** AWS EC2 · Docker Compose · Ubuntu 24.04 LTS

---

## Architecture Overview

```
                        Internet
                            │
                    ┌───────▼────────┐
                    │   AWS EC2      │
                    │  (Ubuntu LTS)  │
                    └───────┬────────┘
                            │
               ┌────────────┴────────────┐
               │                         │
       ┌───────▼──────┐         ┌────────▼──────┐
       │  Frontend    │         │   Backend     │
       │  Nginx:80    │         │ Node.js:3000  │
       │  Angular SPA │         │   REST API    │
       └──────────────┘         └────────┬──────┘
                                         │ SSL
                                ┌────────▼──────────┐
                                │      Supabase      │
                                │  (managed cloud DB)│
                                │  PostgreSQL :5432  │
                                └────────────────────┘
```

### Production Requirements (Graded Assignment)
- **CPU:** 0.5 vCPU per service
- **Memory:** 128 MB per service
- **Build:** Multi-stage (optimized images)

---

## Docker File Structure

```
g01/
├── Dockerfile.dev              # Backend — development
├── Dockerfile.prod             # Backend — production (multi-stage)
├── docker-compose.yml          # Development orchestration
├── docker-compose.prod.yml     # Production orchestration (with resource limits)
└── src/frontend/
    ├── Dockerfile.dev          # Frontend — development
    └── Dockerfile.prod         # Frontend — production (multi-stage + Nginx)
```

---

## 1. Initial Setup (Executed once)

### 1.1 Provisioning the EC2 Instance

1. Access the [AWS Academy Learner Lab](https://awsacademy.instructure.com) and click **Start Lab**.
2. Open the AWS console (green dot) and navigate to **EC2 > Instances > Launch Instance**.
3. Configure the instance:

| Parameter | Value |
|-----------|-------|
| AMI | Ubuntu Server 24.04 LTS |
| Instance Type | `t2.micro` |
| Key Pair | `Projeto G01` (save the [.pem](file:///Users/giacomozema/Downloads/Projeto%20G01.pem) file locally) |

4. Under **User Data**, add the bootstrap script:

```bash
#!/bin/bash
apt-get update -y
apt-get install -y docker.io docker-compose git
systemctl enable docker
systemctl start docker
usermod -aG docker ubuntu
```

### 1.2 Security Group Configuration

Add the following inbound rules:

| Type | Protocol | Port | Source |
|------|----------|------|--------|
| SSH | TCP | 22 | `0.0.0.0/0` |
| HTTP | TCP | 80 | `0.0.0.0/0` |
| Custom TCP | TCP | 3000 | `0.0.0.0/0` |
| Custom TCP | TCP | 5432 | `0.0.0.0/0` |

### 1.3 SSH Key Permissions

```bash
chmod 400 "/Users/giacomozema/Downloads/Projeto G01.pem"
```

### 1.4 SSH Connection and Repository Clone

```bash
# Connect to the instance
ssh -i "/Users/giacomozema/Downloads/Projeto G01.pem" ubuntu@<PUBLIC_IP>

# Clone the repository and switch to the correct branch
git clone https://git.inteli.edu.br/graduacao/2026-1a/t17/g01.git
cd g01
git checkout feat/docker
```

### 1.5 Creating the Environment Variables File

> **Important:** The [.env](file:///Users/giacomozema/g01/.env) file is listed in [.gitignore](file:///Users/giacomozema/g01/.gitignore) for security purposes. It must be created manually on the server each new session.

```bash
cat > ~/g01/.env << 'EOF'
DB_USER=postgres.ziodksrmplptecxuaprg
DB_HOST=aws-0-us-west-2.pooler.supabase.com
DB_DATABASE=postgres
DB_PASSWORD=,8UVA3£35<geij?.g|hbr23,
DB_PORT=5432
DB_SSL=true
EOF
```

---

## 2. Production Deployment

```bash
cd ~/g01

# Remove any residual containers (avoids the "ContainerConfig" bug in docker-compose v1)
sudo docker rm -f $(sudo docker ps -aq)

# Build and start all services in detached mode
sudo docker-compose -f docker-compose.prod.yml up -d --build
```

**Expected output:**
```
Creating g01_database_1 ... done
Creating g01_backend_1  ... done
Creating g01_frontend_1 ... done
```

Access the application at: `http://<PUBLIC_IP>`

---

## 3. Session Routine (AWS Academy)

> The Learner Lab automatically suspends the instance after **4 hours**. The public IP is reassigned each session.

```bash
# 1. Connect with the new IP (retrieved from the EC2 dashboard)
ssh -i "/Users/giacomozema/Downloads/Projeto G01.pem" ubuntu@<NEW_IP>

# 2. Recreate the .env file
cat > ~/g01/.env << 'EOF'
DB_USER=postgres.ziodksrmplptecxuaprg
DB_HOST=aws-0-us-west-2.pooler.supabase.com
DB_DATABASE=postgres
DB_PASSWORD=,8UVA3£35<geij?.g|hbr23,
DB_PORT=5432
DB_SSL=true
EOF

# 3. Start the containers
cd ~/g01
sudo docker rm -f $(sudo docker ps -aq)
sudo docker-compose -f docker-compose.prod.yml up -d --build
```

---

## 4. Code Update Workflow

```bash
# --- Local machine (Mac) ---
git add .
git commit -m "feat|fix|refactor: description of the change"
git push

# --- AWS server ---
cd ~/g01
git pull
sudo docker rm -f $(sudo docker ps -aq)
sudo docker-compose -f docker-compose.prod.yml up -d --build
```

---

## 5. Diagnostics and Monitoring

```bash
# List containers and status
sudo docker ps

# Backend logs
sudo docker logs g01_backend_1

# Frontend logs
sudo docker logs g01_frontend_1
```

**Verification endpoints:**

| Endpoint | Description |
|----------|-------------|
| `http://<IP>` | Angular Frontend (Nginx) |
| `http://<IP>:3000/` | API — list all uploads (JSON response from Supabase) |

---

## 6. Database Access via Supabase

The production database is hosted on **Supabase**. All data persists independently of the EC2 instance lifecycle — sessions, restarts, or IP changes do not affect stored data.

Access [supabase.com](https://supabase.com), open your project, and navigate to **Table Editor** to view and manage the `submission` table directly.

> **Note:** The EC2 instance does **not** need to be running to access Supabase data.

---

## 7. Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| `ContainerConfig` KeyError | Bug in docker-compose v1.29 when recreating containers | `sudo docker rm -f $(sudo docker ps -aq)` then restart |
| `port 5432 already in use` | Local PostgreSQL running on the same port | Confirm you are connected to AWS, not local machine |
| SSH `Connection refused` | Learner Lab session expired | Restart the lab and retrieve the new IP from the EC2 dashboard |
| `relation does not exist` | Empty database after a new session | `sudo docker exec g01_backend_1 node dist/src/database/runDB/init.js` |
| Upload returns `422` | ExcelJS failed to parse the file | Check file extension and format (`.csv`, `.xlsx`, `.xls`) |
