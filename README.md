<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Hospital Information System (HIS)

A microservices-based Hospital Information System built with NestJS, Prisma, and PostgreSQL.

## 📋 Table of Contents

- [Architecture]
- [Microservices]
- [Prerequisites]
- [Getting Started]
  - [Local Development]
  - [Docker Compose]
- [Database Setup]
- [Building the Project]
- [Running Tests]
- [API Documentation]

## 🏗️ Architecture

This system follows a microservices architecture with the following services:

- **API Gateway**: Routes requests to appropriate microservices
- **Patients Service**: Manages patient demographics and records
- **Users Service**: Handles authentication and user management
- **Triage Service**: Manages emergency triage and vital signs
- **EHR Service**: Electronic Health Records management

Each microservice has its own PostgreSQL database for complete data isolation.

## 🔧 Microservices

| Service | Port | Database Port | Description |
|---------|------|---------------|-------------|
| API Gateway | 3005 | - | Main entry point |
| Patients | 3001 | 5433 | Patient management |
| Users | 3002 | 5434 | User & authentication |
| Triage | 3003 | 5435 | Triage & vital signs |
| EHR | 3004 | 5436 | Medical records |

## 📦 Prerequisites

- Node.js 20+ and npm
- Docker and Docker Compose
- PostgreSQL 16 (for local development)

## 🚀 Getting Started

### Local Development

#### 1. Clone the repository

```bash
git clone https://github.com/EfraRS-dev/his.git
cd his
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Set up environment variables

Create `.env` files for each microservice:

**`apps/patients/.env`**

```env
PATIENTS_DB_URL=postgresql://patients_user:patients_pass@localhost:5433/patients
PORT=3001
```

**`apps/users/.env`**

```env
USER_DB_URL=postgresql://users_user:users_pass@localhost:5434/users
JWT_SECRET=Users_Secret
PORT=3002
```

**`apps/triage/.env`**

```env
TRIAGE_DB_URL=postgresql://triage_user:triage_pass@localhost:5435/triage
PATIENTS_SERVICE_URL=http://localhost:3001
USERS_SERVICE_URL=http://localhost:3002
PORT=3003
```

**`apps/ehr/.env`**

```env
EHR_DB_URL=postgresql://ehr_user:ehr_pass@localhost:5436/ehr
PORT=3004
```

**`apps/api-gateway/.env`**

```env
PATIENTS_URL=http://localhost:3001
USERS_URL=http://localhost:3002
TRIAGE_URL=http://localhost:3003
EHR_URL=http://localhost:3004
PORT=3005
```

#### 4. Start databases only (using Docker Compose)

```bash
docker-compose up -d patients-db users-db triage-db ehr-db
```

#### 5. Generate Prisma clients

```bash
npx prisma generate --schema apps/patients/prisma/schema.prisma
npx prisma generate --schema apps/users/prisma/schema.prisma
npx prisma generate --schema apps/triage/prisma/schema.prisma
npx prisma generate --schema apps/ehr/prisma/schema.prisma
```

#### 6. Run database migrations

```bash
npm run migrate:patients
npm run migrate:users
npm run migrate:triage
npm run migrate:ehr
```

#### 7. Seed databases (optional)

```bash
npm run seed
```

Or seed individually:

```bash
npx prisma db seed --schema apps/patients/prisma/schema.prisma
npx prisma db seed --schema apps/users/prisma/schema.prisma
npx prisma db seed --schema apps/triage/prisma/schema.prisma
npx prisma db seed --schema apps/ehr/prisma/schema.prisma
```

#### 8. Start microservices in development mode

Open separate terminals for each service:

```bash
# Terminal 1 - Patients
npm run start:dev patients

# Terminal 2 - Users
npm run start:dev users

# Terminal 3 - Triage
npm run start:dev triage

# Terminal 4 - EHR
npm run start:dev ehr

# Terminal 5 - API Gateway
npm run start:dev api-gateway
```

### Docker Compose

#### 1. Build and start all services

```bash
docker-compose up --build
```

Or in detached mode:

```bash
docker-compose up -d --build
```

#### 2. View logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f patients
```

#### 3. Stop services

```bash
docker-compose down
```

#### 4. Stop and remove volumes (⚠️ deletes data)

```bash
docker-compose down -v
```

## 🗄️ Database Setup

### Generate Prisma Clients

```bash
# All services
npx prisma generate --schema apps/patients/prisma/schema.prisma
npx prisma generate --schema apps/users/prisma/schema.prisma
npx prisma generate --schema apps/triage/prisma/schema.prisma
npx prisma generate --schema apps/ehr/prisma/schema.prisma
```

### Run Migrations

```bash
# Development migrations
npm run migrate:patients
npm run migrate:users
npm run migrate:triage
npm run migrate:ehr

# Or manually
npx prisma migrate dev --schema apps/patients/prisma/schema.prisma
```

### Deploy Migrations (Production)

```bash
npx prisma migrate deploy --schema apps/patients/prisma/schema.prisma
npx prisma migrate deploy --schema apps/users/prisma/schema.prisma
npx prisma migrate deploy --schema apps/triage/prisma/schema.prisma
npx prisma migrate deploy --schema apps/ehr/prisma/schema.prisma
```

### Database Push (Quick sync without migrations)

```bash
npx prisma db push --schema apps/triage/prisma/schema.prisma
```

### Open Prisma Studio

```bash
npx prisma studio --schema apps/patients/prisma/schema.prisma
```

## 🔨 Building the Project

### Build all microservices

```bash
npm run build
```

### Build specific microservice

```bash
# Using NestJS CLI
npx nest build patients
npx nest build users
npx nest build triage
npx nest build ehr
npx nest build api-gateway
```

### Build for production

```bash
NODE_ENV=production npm run build
```

### Docker builds

```bash
# Build specific service
docker-compose build patients

# Build all services
docker-compose build

# Build without cache
docker-compose build --no-cache
```

## 🧪 Running Tests

### Unit tests

```bash
npm run test
```

### Watch mode

```bash
npm run test:watch
```

### Test coverage

```bash
npm run test:cov
```

### E2E tests

```bash
npm run test:e2e
```

### Integration tests

```bash
npm run test:integration
```

## 📚 API Documentation

Each microservice exposes Swagger documentation:

- **API Gateway**: <http://localhost:3005/api>
- **Patients Service**: <http://localhost:3001/api>
- **Users Service**: <http://localhost:3002/api>
- **Triage Service**: <http://localhost:3003/api>
- **EHR Service**: <http://localhost:3004/api>

## 🐳 Kubernetes Deployment

For Kubernetes deployment, see the [`kubernetes/`](kubernetes/) directory.

```bash
# Apply manifests in order
kubectl apply -f kubernetes/00-namespace.yaml
kubectl apply -f kubernetes/01-secrets-configmaps.yaml
kubectl apply -f kubernetes/02-postgres-statefulsets-and-services.yaml
kubectl apply -f kubernetes/03-services-deployments.yaml
kubectl apply -f kubernetes/04-ingress.yaml
```

## 📝 Environment Variables Reference

### Common Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Service port | `3000` |
| `*_DB_URL` | Database connection string | `postgresql://user:pass@host:port/db` |

### Service-Specific Variables

#### **Users Service**

- `JWT_SECRET`: Secret key for JWT token signing

#### **Triage Service**

- `PATIENTS_SERVICE_URL`: URL to patients service
- `USERS_SERVICE_URL`: URL to users service

#### **API Gateway**

- `PATIENTS_URL`: Patients service URL
- `USERS_URL`: Users service URL
- `TRIAGE_URL`: Triage service URL
- `EHR_URL`: EHR service URL

Built with ❤️ using [NestJS](https://nestjs.com/)
