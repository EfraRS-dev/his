# Triage Module - Integration Tests

## 📋 Overview

Este archivo contiene tests de integración end-to-end (e2e) para el módulo de Triage, cubriendo todas las operaciones CRUD y validaciones de negocio.

## 🧪 Test Coverage

### 1. **Health Check**

- ✅ Verificar que el servicio está funcionando

### 2. **Create Triage**

- ✅ Crear nuevo triage exitosamente
- ✅ Validar nivel de urgencia (1-5)
- ✅ Rechazar paciente inexistente (404)
- ✅ Rechazar enfermera inexistente (404)
- ✅ Rechazar usuario sin rol NURSE (400)

### 3. **Register Triage with Vital Signs**

- ✅ Registrar triage con signos vitales
- ✅ Rechazar paciente con triage activo (400)

### 4. **Get Triage**

- ✅ Obtener triage por ID
- ✅ Obtener triage por ID de paciente
- ✅ Obtener triage activo
- ✅ Retornar 404 para triage inexistente

### 5. **Update Triage**

- ✅ Actualizar nivel de urgencia
- ✅ Actualizar con nuevos signos vitales
- ✅ Rechazar usuario inexistente (404)
- ✅ Rechazar usuario inactivo (400)
- ✅ Rechazar triage inexistente (404)

### 6. **Update Priority**

- ✅ Actualizar solo la prioridad
- ✅ Validar nivel de urgencia

### 7. **Vital Signs**

- ✅ Agregar nuevos signos vitales
- ✅ Obtener signos vitales por triage ID
- ✅ Obtener signos vitales por ID
- ✅ Rechazar triage inexistente (404)

### 8. **Queue Management**

- ✅ Listar todos los pacientes en cola
- ✅ Filtrar por nivel de urgencia
- ✅ Incluir resumen de todos los niveles

### 9. **Statistics**

- ✅ Obtener estadísticas de triage

### 10. **Delete Triage**

- ✅ Eliminar entrada de triage
- ✅ Manejar triage inexistente
- ✅ Validar campos requeridos

### 11. **Validation**

- ✅ Rechazar campos extra
- ✅ Rechazar campos faltantes
- ✅ Rechazar tipos de datos inválidos

---

## 🚀 Prerequisites

### 1. Base de Datos de Test

Asegúrate de tener una base de datos PostgreSQL para tests:

```bash
# Opción 1: Crear base de datos dedicada
CREATE DATABASE triage_test;

# Opción 2: Usar Docker
docker run -d \
  --name triage-test-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=triage_test \
  -p 5433:5432 \
  postgres:15-alpine
```

### 2. Variables de Entorno

Crear archivo `.env` en `apps/triage/`:

```env
# Database
TRIAGE_DB_URL="postgresql://postgres:postgres@localhost:5433/triage_test"

# HTTP Client
HTTP_CLIENT_TIMEOUT=5000

# Microservices URLs
PATIENTS_SERVICE_URL="http://localhost:3001"
USERS_SERVICE_URL="http://localhost:3002"

# App
PORT=3005
```

### 3. Instalar Dependencias

```bash
npm install --save-dev supertest @types/supertest
```

### 4. Ejecutar Migraciones

```bash
cd apps/triage
npx prisma migrate deploy
```

---

## 🧪 Running Tests

### Ejecutar todos los tests e2e

```bash
# Desde el root del proyecto
npm run test:e2e -- triage

# O directamente con Jest
npx jest --config apps/triage/test/jest-e2e.json
```

### Ejecutar tests específicos

```bash
# Solo tests de Create
npx jest --config apps/triage/test/jest-e2e.json -t "Create Triage"

# Solo tests de Update
npx jest --config apps/triage/test/jest-e2e.json -t "Update Triage"

# Solo tests de Delete
npx jest --config apps/triage/test/jest-e2e.json -t "Delete Triage"
```

### Ejecutar con cobertura

```bash
npx jest --config apps/triage/test/jest-e2e.json --coverage
```

### Modo watch

```bash
npx jest --config apps/triage/test/jest-e2e.json --watch
```

---

## 📝 Test Data Setup

Los tests utilizan los datos de seeding ya creados en el sistema. **IMPORTANTE:** Asegúrate de ejecutar los scripts de seed antes de correr los tests.

### **Seed Data Reference**

#### **Usuarios** (de `apps/users/prisma/seed.ts`)

- `userId: 1` - admin (roleId: 1 - Admin)
- `userId: 2` - dr.smith (roleId: 2 - Doctor)
- `userId: 3` - dr.garcia (roleId: 2 - Doctor)
- `userId: 4` - nurse.johnson (roleId: 3 - Nurse) - **✅ USADO EN TESTS**
- `userId: 5` - nurse.martinez (roleId: 3 - Nurse)
- `userId: 6` - nurse.brown (roleId: 3 - Nurse)
- `userId: 7` - patient.doe (roleId: 4 - Patient)
- `userId: 8` - patient.rodriguez (roleId: 4 - Patient)

#### **Pacientes** (de `apps/patients/prisma/seed.ts`)

- `patientId: 1` - John Doe (linked to userId: 7) - **✅ USADO EN TESTS**
- `patientId: 2` - Maria Rodriguez (linked to userId: 8)
- `patientId: 3` - Robert Chen
- `patientId: 4` - Sarah Williams
- `patientId: 5` - Ahmed Hassan

#### **Roles**

- `roleId: 1` - Admin
- `roleId: 2` - Doctor
- `roleId: 3` - Nurse - **✅ REQUERIDO PARA CREAR TRIAGE**
- `roleId: 4` - Patient

### Ejecutar Seed Scripts

```bash
# Desde el root del proyecto
npm run seed:users
npm run seed:patients
npm run seed:triage

# O ejecutar todos a la vez
npm run seed:all
```

O manualmente con SQL:

```sql
-- En la base de datos de Users
INSERT INTO roles (name, description) VALUES
  ('ADMIN', 'Administrator'),
  ('DOCTOR', 'Doctor'),
  ('NURSE', 'Nurse'),
  ('RECEPTIONIST', 'Receptionist');

INSERT INTO users (username, password, email, "roleId", status) VALUES
  ('admin', '$2b$10$hash', 'admin@test.com', 1, 'active'),
  ('doctor', '$2b$10$hash', 'doctor@test.com', 2, 'active'),
  ('nurse', '$2b$10$hash', 'nurse@test.com', 3, 'active'),
  ('inactive_user', '$2b$10$hash', 'inactive@test.com', 3, 'inactive');

-- En la base de datos de Patients
INSERT INTO patients ("userId", "documentType", "documentNumber", "firstName", "lastName", "birthDate", gender, address, phone, email, "emergencyContact", status) VALUES
  (NULL, 'DNI', '12345678', 'Juan', 'Pérez', '1990-01-01T00:00:00.000Z', 'Male', 'Av. Test 123', '+51999888777', 'juan@test.com', '+51999888776', 'active');
```

---

## 🔧 Troubleshooting

### Error: "Cannot find module 'supertest'"

```bash
npm install --save-dev supertest @types/supertest
```

### Error: "Database connection failed"

Verifica que:

1. PostgreSQL está corriendo
2. La URL en `.env` es correcta
3. La base de datos existe

```bash
# Verificar conexión
psql -h localhost -p 5433 -U postgres -d triage_test
```

### Error: "Patient not found" o "Nurse not found"

Asegúrate de que los datos de prueba existen:

- Los microservicios de Patients y Users están corriendo
- Los datos de seed fueron creados

### Tests fallan con "ECONNREFUSED"

Los microservicios externos deben estar corriendo:

```bash
# Terminal 1 - Patients Service
npm run start:dev patients

# Terminal 2 - Users Service
npm run start:dev users

# Terminal 3 - Triage Service
npm run start:dev triage

# Terminal 4 - Tests
npm run test:e2e -- triage
```

---

## 📊 Expected Test Results

```bash
PASS  apps/triage/test/triage.e2e-spec.ts
  Triage Module (e2e)
    Health Check
      ✓ /triage/health (GET) - should return health status
    Create Triage
      ✓ /triage (POST) - should create a new triage entry
      ✓ /triage (POST) - should fail with invalid urgency level
      ✓ /triage (POST) - should fail when patient does not exist
      ✓ /triage (POST) - should fail when nurse does not exist
      ✓ /triage (POST) - should fail when user does not have NURSE role
    Register Triage with Vital Signs
      ✓ /triage/register (POST) - should register triage with vital signs
      ✓ /triage/register (POST) - should fail when patient already has active triage
    Get Triage
      ✓ /triage/:id (GET) - should retrieve triage by ID
      ✓ /triage/:id (GET) - should return 404 for non-existent triage
      ✓ /triage/patient/:patientId (GET) - should retrieve triage by patient ID
      ✓ /triage/patient/:patientId/active (GET) - should retrieve active triage
    Update Triage
      ✓ /triage/:id (PATCH) - should update triage urgency level
      ✓ /triage/:id (PATCH) - should update triage with vital signs
      ✓ /triage/:id (PATCH) - should fail when user does not exist
      ✓ /triage/:id (PATCH) - should fail when user is not active
      ✓ /triage/:id (PATCH) - should fail when triage does not exist
    Update Priority
      ✓ /triage/:id/priority (PATCH) - should update only priority
      ✓ /triage/:id/priority (PATCH) - should fail with invalid urgency level
    Vital Signs
      ✓ /triage/:id/vital-signs (POST) - should add new vital signs to triage
      ✓ /triage/:id/vital-signs (GET) - should retrieve vital signs by triage ID
      ✓ /triage/vital-signs/:vitalSignsId (GET) - should retrieve vital signs by ID
      ✓ /triage/:id/vital-signs (POST) - should fail when triage does not exist
    Queue Management
      ✓ /triage/queue (GET) - should list all patients in queue
      ✓ /triage/queue?urgencyLevel=1 (GET) - should filter by urgency level
      ✓ /triage/queue?includeAllLevels=true (GET) - should include all levels summary
    Statistics
      ✓ /triage/stats (GET) - should return triage statistics
    Delete Triage
      ✓ /triage/:id (DELETE) - should delete triage entry
      ✓ /triage/:id (DELETE) - should fail when triage does not exist
      ✓ /triage/:id (DELETE) - should fail with missing required fields
    Validation
      ✓ /triage - should reject request with extra fields
      ✓ /triage - should reject request with missing required fields
      ✓ /triage - should reject request with invalid data types

Test Suites: 1 passed, 1 total
Tests:       34 passed, 34 total
Snapshots:   0 total
Time:        15.234 s
```

---

## 🎯 Best Practices

### 1. **Test Isolation**

Cada test debe ser independiente y no depender del estado de otros tests.

### 2. **Cleanup**

Los tests limpian automáticamente los datos creados en `afterAll()`.

### 3. **Realistic Data**

Usar datos realistas que reflejen el uso real del sistema.

### 4. **Error Cases**

Probar tanto casos exitosos como casos de error (404, 400, etc.).

### 5. **Asynchronous**

Todos los tests son asíncronos usando `async/await` o `return`.

---

## 📚 Resources

- [NestJS Testing](https://docs.nestjs.com/fundamentals/testing)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Supertest](https://github.com/visionmedia/supertest)
- [Prisma Testing](https://www.prisma.io/docs/guides/testing)

---
