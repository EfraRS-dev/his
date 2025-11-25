# RabbitMQ Notifications Implementation Plan
## Complete Microservices Architecture

## Overview

This plan details the implementation of RabbitMQ notifications across all microservices in the HIS (Health Information System), following the successful pattern implemented in the Triage microservice.

---

## 🏗️ Architecture

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Patients   │  │    Users     │  │    Triage    │  │     EHR      │
│ Microservice │  │ Microservice │  │ Microservice │  │ Microservice │
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │                 │                 │                 │
       │ Events          │ Events          │ Events          │ Events
       │                 │                 │                 │
       └─────────────────┴─────────────────┴─────────────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │   RabbitMQ      │
                         │    Broker       │
                         └─────────────────┘
                                  │
                                  │ Consumes All Events
                                  │
                                  ▼
                         ┌─────────────────┐
                         │  API Gateway    │
                         │  (Consumer +    │
                         │   REST API)     │
                         └─────────────────┘
                                  │
                                  │ REST API
                                  │
                                  ▼
                         ┌─────────────────┐
                         │   Frontend      │
                         │  Application    │
                         └─────────────────┘
```

---

## 📋 Microservices Analysis

### ✅ 1. Triage Microservice (COMPLETED)

**Status**: Fully Implemented

**Events Published**:
- `triage.created`
- `triage.updated`
- `triage.priority.changed`
- `triage.deleted`
- `vital-signs.registered`

**Components**:
- ✅ Domain Events
- ✅ RabbitMQ Module & Service
- ✅ Use Cases Integration
- ✅ Queue: `triage.events`

---

### 🔵 2. Patients Microservice (TO IMPLEMENT)

**Purpose**: Patient registration, updates, and archival notifications

**Use Cases to Instrument**:
1. `PatientRegisterUseCase` → Register new patient
2. `UpdatePatientUseCase` → Update patient information
3. `ArchivePatientUseCase` → Archive patient

**Events to Publish**:

#### `patient.registered`
```typescript
{
  eventType: 'patient.registered',
  timestamp: Date,
  data: {
    patientId: number,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    gender: string,
    registeredBy: number
  },
  metadata: {
    userId: number,
    source: 'patients-service'
  }
}
```

#### `patient.updated`
```typescript
{
  eventType: 'patient.updated',
  timestamp: Date,
  data: {
    patientId: number,
    changes: Record<string, any>,
    updatedBy: number
  },
  metadata: {
    userId: number,
    source: 'patients-service'
  }
}
```

#### `patient.archived`
```typescript
{
  eventType: 'patient.archived',
  timestamp: Date,
  data: {
    patientId: number,
    reason: string,
    archivedBy: number
  },
  metadata: {
    userId: number,
    source: 'patients-service'
  }
}
```

**Components to Create**:
```
apps/patients/src/
├── domain/events/
│   ├── patient-registered.event.ts
│   ├── patient-updated.event.ts
│   ├── patient-archived.event.ts
│   └── index.ts
├── infrastructure/messaging/
│   ├── rabbitmq.module.ts
│   ├── rabbitmq.service.ts
│   └── index.ts
```

**Queue**: `patients.events`

**Environment Variables**:
```env
RABBITMQ_URL="amqp://admin:admin@localhost:5672"
RABBITMQ_QUEUE_PATIENTS_EVENTS="patients.events"
```

---

### 🟢 3. Users Microservice (TO IMPLEMENT)

**Purpose**: User management, authentication, and role notifications

**Use Cases to Instrument**:
1. `CreateUserUseCase` → New user creation
2. `UpdateUserUseCase` → User information update
3. `BlockUserUseCase` → User blocking/suspension
4. `LoginUseCase` → User authentication events
5. `CreateRoleUseCase` → New role creation

**Events to Publish**:

#### `user.created`
```typescript
{
  eventType: 'user.created',
  timestamp: Date,
  data: {
    userId: number,
    username: string,
    email: string,
    roleId: number,
    roleName: string,
    createdBy: number
  },
  metadata: {
    userId: number,
    source: 'users-service'
  }
}
```

#### `user.updated`
```typescript
{
  eventType: 'user.updated',
  timestamp: Date,
  data: {
    userId: number,
    changes: Record<string, any>,
    updatedBy: number
  },
  metadata: {
    userId: number,
    source: 'users-service'
  }
}
```

#### `user.blocked`
```typescript
{
  eventType: 'user.blocked',
  timestamp: Date,
  data: {
    userId: number,
    reason: string,
    blockedBy: number,
    status: string
  },
  metadata: {
    userId: number,
    source: 'users-service'
  }
}
```

#### `user.login`
```typescript
{
  eventType: 'user.login',
  timestamp: Date,
  data: {
    userId: number,
    username: string,
    ipAddress?: string,
    userAgent?: string
  },
  metadata: {
    userId: number,
    source: 'users-service'
  }
}
```

#### `user.login.failed`
```typescript
{
  eventType: 'user.login.failed',
  timestamp: Date,
  data: {
    username: string,
    reason: string,
    ipAddress?: string
  },
  metadata: {
    source: 'users-service'
  }
}
```

#### `role.created`
```typescript
{
  eventType: 'role.created',
  timestamp: Date,
  data: {
    roleId: number,
    roleName: string,
    description: string,
    createdBy: number
  },
  metadata: {
    userId: number,
    source: 'users-service'
  }
}
```

**Components to Create**:
```
apps/users/src/
├── domain/events/
│   ├── user-created.event.ts
│   ├── user-updated.event.ts
│   ├── user-blocked.event.ts
│   ├── user-login.event.ts
│   ├── user-login-failed.event.ts
│   ├── role-created.event.ts
│   └── index.ts
├── infrastructure/messaging/
│   ├── rabbitmq.module.ts
│   ├── rabbitmq.service.ts
│   └── index.ts
```

**Queue**: `users.events`

**Environment Variables**:
```env
RABBITMQ_URL="amqp://admin:admin@localhost:5672"
RABBITMQ_QUEUE_USERS_EVENTS="users.events"
```

---

### 🟡 4. EHR Microservice (TO IMPLEMENT)

**Purpose**: Electronic Health Records notifications

**Use Cases to Instrument**:
1. `CreateMedicalHistoryUseCase` → New medical history
2. `ArchiveMedicalHistoryUseCase` → Archive history
3. `UnarchiveMedicalHistoryUseCase` → Restore history
4. `CreateAntecedentUseCase` → Add antecedent
5. `UpdateAntecedentUseCase` → Update antecedent
6. `DeleteAntecedentUseCase` → Remove antecedent

**Events to Publish**:

#### `medical-history.created`
```typescript
{
  eventType: 'medical-history.created',
  timestamp: Date,
  data: {
    medicalHistoryId: number,
    patientId: number,
    createdBy: number
  },
  metadata: {
    userId: number,
    source: 'ehr-service'
  }
}
```

#### `medical-history.archived`
```typescript
{
  eventType: 'medical-history.archived',
  timestamp: Date,
  data: {
    medicalHistoryId: number,
    patientId: number,
    archivedBy: number
  },
  metadata: {
    userId: number,
    source: 'ehr-service'
  }
}
```

#### `medical-history.unarchived`
```typescript
{
  eventType: 'medical-history.unarchived',
  timestamp: Date,
  data: {
    medicalHistoryId: number,
    patientId: number,
    unarchivedBy: number
  },
  metadata: {
    userId: number,
    source: 'ehr-service'
  }
}
```

#### `antecedent.created`
```typescript
{
  eventType: 'antecedent.created',
  timestamp: Date,
  data: {
    antecedentId: number,
    medicalHistoryId: number,
    patientId: number,
    type: string,
    description: string,
    createdBy: number
  },
  metadata: {
    userId: number,
    source: 'ehr-service'
  }
}
```

#### `antecedent.updated`
```typescript
{
  eventType: 'antecedent.updated',
  timestamp: Date,
  data: {
    antecedentId: number,
    changes: Record<string, any>,
    updatedBy: number
  },
  metadata: {
    userId: number,
    source: 'ehr-service'
  }
}
```

#### `antecedent.deleted`
```typescript
{
  eventType: 'antecedent.deleted',
  timestamp: Date,
  data: {
    antecedentId: number,
    medicalHistoryId: number,
    deletedBy: number
  },
  metadata: {
    userId: number,
    source: 'ehr-service'
  }
}
```

**Components to Create**:
```
apps/ehr/src/
├── domain/events/
│   ├── medical-history-created.event.ts
│   ├── medical-history-archived.event.ts
│   ├── medical-history-unarchived.event.ts
│   ├── antecedent-created.event.ts
│   ├── antecedent-updated.event.ts
│   ├── antecedent-deleted.event.ts
│   └── index.ts
├── infrastructure/messaging/
│   ├── rabbitmq.module.ts
│   ├── rabbitmq.service.ts
│   └── index.ts
```

**Queue**: `ehr.events`

**Environment Variables**:
```env
RABBITMQ_URL="amqp://admin:admin@localhost:5672"
RABBITMQ_QUEUE_EHR_EVENTS="ehr.events"
```

---

## 🎯 API Gateway Integration

### Current State
- ✅ Consumes from `triage.events` queue
- ✅ Stores notifications in memory
- ✅ Exposes REST API endpoints

### Enhancements Needed

#### 1. Multi-Queue Consumer

Update `notification-consumer.service.ts` to consume from multiple queues:

```typescript
private readonly queues = [
  { name: 'triage.events', source: 'triage-service' },
  { name: 'patients.events', source: 'patients-service' },
  { name: 'users.events', source: 'users-service' },
  { name: 'ehr.events', source: 'ehr-service' },
];
```

#### 2. Enhanced Filtering

Add source-based filtering in controller:
- Filter by microservice source
- Filter by event category (clinical, administrative, security)
- Filter by patient ID (cross-service)
- Filter by user ID (cross-service)

#### 3. Event Routing

```typescript
// Route events to specific handlers
switch (event.metadata.source) {
  case 'triage-service':
    // Handle triage events
    break;
  case 'patients-service':
    // Handle patient events
    break;
  case 'users-service':
    // Handle user events
    break;
  case 'ehr-service':
    // Handle EHR events
    break;
}
```

#### 4. New Endpoints

```typescript
GET /notifications/clinical      // Triage + EHR events
GET /notifications/administrative // Patients + Users events
GET /notifications/security      // Login/auth events
GET /notifications/patient/:id   // All events for a patient
GET /notifications/user/:id      // All events by/for a user
```

---

## 📦 Complete Event Catalog

### Event Categories

#### Clinical Events (Triage + EHR)
- `triage.*` (5 events)
- `vital-signs.*` (1 event)
- `medical-history.*` (3 events)
- `antecedent.*` (3 events)
**Total**: 12 clinical events

#### Administrative Events (Patients)
- `patient.*` (3 events)
**Total**: 3 administrative events

#### Security/Access Events (Users)
- `user.*` (4 events)
- `role.*` (1 event)
**Total**: 5 security events

#### Grand Total: 20 Event Types

---

## 🔧 Implementation Steps

### Phase 1: Patients Microservice
1. Create domain events (3 events)
2. Create RabbitMQ infrastructure
3. Update module configuration
4. Integrate into use cases
5. Update .env file
6. Test event publishing

**Estimated Time**: 2-3 hours

### Phase 2: Users Microservice
1. Create domain events (6 events)
2. Create RabbitMQ infrastructure
3. Update module configuration
4. Integrate into use cases (including login)
5. Update .env file
6. Test event publishing

**Estimated Time**: 3-4 hours

### Phase 3: EHR Microservice
1. Create domain events (6 events)
2. Create RabbitMQ infrastructure
3. Update module configuration
4. Integrate into use cases
5. Update .env file
6. Test event publishing

**Estimated Time**: 3-4 hours

### Phase 4: API Gateway Enhancement
1. Update consumer service for multi-queue
2. Add enhanced filtering endpoints
3. Add category-based endpoints
4. Update documentation
5. Test complete flow

**Estimated Time**: 2-3 hours

**Total Estimated Time**: 10-14 hours

---

## 🌐 Environment Configuration

### Root .env File
```env
# Existing
PORT=3000
PATIENTS_DB_URL="postgresql://patients_user:patients_pass@localhost:5433/patients"
USER_DB_URL="postgresql://users_user:users_pass@localhost:5434/users"
TRIAGE_DB_URL="postgresql://triage_user:triage_pass@localhost:5435/triage"
EHR_DB_URL="postgresql://ehr_user:ehr_pass@localhost:5436/ehr"
JWT_SECRET="User_Secret"

# RabbitMQ - Already exists
RABBITMQ_URL="amqp://admin:admin@localhost:5672"

# Queue Names - Add these
RABBITMQ_QUEUE_TRIAGE_EVENTS="triage.events"
RABBITMQ_QUEUE_PATIENTS_EVENTS="patients.events"
RABBITMQ_QUEUE_USERS_EVENTS="users.events"
RABBITMQ_QUEUE_EHR_EVENTS="ehr.events"
```

### Docker Compose Updates

Add RabbitMQ URL to each service:

```yaml
patients:
  environment:
    RABBITMQ_URL: 'amqp://admin:admin@rabbitmq:5672'
  depends_on:
    - rabbitmq

users:
  environment:
    RABBITMQ_URL: 'amqp://admin:admin@rabbitmq:5672'
  depends_on:
    - rabbitmq

ehr:
  environment:
    RABBITMQ_URL: 'amqp://admin:admin@rabbitmq:5672'
  depends_on:
    - rabbitmq

api-gateway:
  environment:
    RABBITMQ_URL: 'amqp://admin:admin@rabbitmq:5672'
  depends_on:
    - rabbitmq
```

---

## 📊 Benefits

1. **Real-time Monitoring**: All system events visible in one place
2. **Audit Trail**: Complete history of all operations
3. **Integration Ready**: Easy to add new consumers (notifications, analytics, etc.)
4. **Decoupled Architecture**: Services don't need to know about consumers
5. **Scalability**: Can add more services and consumers easily
6. **Security**: Track all authentication and authorization events
7. **Clinical Insights**: Monitor patient care workflow
8. **Compliance**: Meet audit and reporting requirements

---

## 🧪 Testing Strategy

### Unit Tests
- Event creation and serialization
- RabbitMQ service publishing
- Notification store operations

### Integration Tests
- End-to-end event flow
- Multi-service event aggregation
- API Gateway filtering and querying

### Manual Tests
1. Register a patient → Check API Gateway for event
2. Update user → Verify event received
3. Create triage → Confirm multiple events
4. Filter by service → Verify correct filtering
5. Filter by event type → Verify accuracy

---

## 📈 Future Enhancements

1. **Persistent Storage**: Redis/MongoDB for notification history
2. **WebSockets**: Real-time push to frontend
3. **Event Replay**: Replay events for debugging
4. **Event Versioning**: Handle breaking changes
5. **Dead Letter Queue**: Handle failed events
6. **Analytics Dashboard**: Visualize system activity
7. **Alert Rules**: Trigger notifications based on patterns
8. **Event Sourcing**: Use events as source of truth

---

## 🎓 Documentation to Create

1. ✅ This implementation plan
2. Individual README per microservice
3. API Gateway multi-queue documentation
4. Event catalog reference
5. Frontend integration guide
6. Troubleshooting guide

---

## ✅ Success Criteria

- [ ] All 4 microservices publish events
- [ ] API Gateway consumes from all 4 queues
- [ ] All 20 event types working
- [ ] Filtering by source works
- [ ] No events lost during normal operations
- [ ] Documentation complete
- [ ] Tests passing

