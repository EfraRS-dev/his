# RabbitMQ Integration - Triage Microservice

## Overview

The Triage microservice now includes RabbitMQ integration for event-driven notifications. This allows other microservices to react to triage events asynchronously.

## Architecture

### Components

1. **Domain Events** (`src/domain/events/`)
   - `TriageCreatedEvent` - Emitted when a new triage is registered
   - `TriageUpdatedEvent` - Emitted when triage information is updated
   - `PriorityChangedEvent` - Emitted when urgency level changes
   - `VitalSignsRegisteredEvent` - Emitted when vital signs are recorded
   - `TriageDeletedEvent` - Emitted when a triage is deleted

2. **Infrastructure** (`src/infrastructure/messaging/`)
   - `RabbitMQModule` - Configures RabbitMQ client connection
   - `RabbitMQService` - Handles event publishing

3. **Integration Points**
   - Events are published from use cases after successful operations
   - No changes to domain entities (clean architecture maintained)

## Events Published

### 1. triage.created

Triggered when: A new triage is registered

**Payload:**

```json
{
  "eventType": "triage.created",
  "timestamp": "2025-11-23T10:30:00.000Z",
  "data": {
    "triageId": 123,
    "patientId": 456,
    "urgencyLevel": 3,
    "nurseId": 789,
    "timestamp": "2025-11-23T10:30:00.000Z"
  },
  "metadata": {
    "userId": 789,
    "source": "triage-service"
  }
}
```

### 2. vital-signs.registered

Triggered when: Vital signs are recorded

**Payload:**

```json
{
  "eventType": "vital-signs.registered",
  "timestamp": "2025-11-23T10:30:00.000Z",
  "data": {
    "vitalSignsId": 111,
    "triageId": 123,
    "patientId": 456,
    "criticalValues": {
      "temperature": false,
      "heartRate": true,
      "oxygenSaturation": false
    },
    "timestamp": "2025-11-23T10:30:00.000Z"
  },
  "metadata": {
    "userId": 789,
    "source": "triage-service"
  }
}
```

**Critical Value Thresholds:**

- Temperature: > 38.5°C or < 35°C
- Heart Rate: > 100 bpm or < 60 bpm
- Oxygen Saturation: < 90%

### 3. triage.priority.changed

Triggered when: Urgency level is updated

**Payload:**

```json
{
  "eventType": "triage.priority.changed",
  "timestamp": "2025-11-23T10:35:00.000Z",
  "data": {
    "triageId": 123,
    "patientId": 456,
    "oldUrgencyLevel": 3,
    "newUrgencyLevel": 2,
    "reason": "Patient condition improved",
    "timestamp": "2025-11-23T10:35:00.000Z"
  },
  "metadata": {
    "source": "triage-service"
  }
}
```

### 4. triage.updated

Triggered when: Triage information is modified

**Payload:**

```json
{
  "eventType": "triage.updated",
  "timestamp": "2025-11-23T10:40:00.000Z",
  "data": {
    "triageId": 123,
    "patientId": 456,
    "changes": {
      "updatedFields": ["urgencyLevel", "observations", "vitalSigns"],
      "reason": "Follow-up assessment"
    },
    "timestamp": "2025-11-23T10:40:00.000Z"
  },
  "metadata": {
    "userId": 999,
    "source": "triage-service"
  }
}
```

### 5. triage.deleted

Triggered when: A triage record is deleted

**Payload:**

```json
{
  "eventType": "triage.deleted",
  "timestamp": "2025-11-23T10:45:00.000Z",
  "data": {
    "triageId": 123,
    "patientId": 456,
    "timestamp": "2025-11-23T10:45:00.000Z"
  },
  "metadata": {
    "userId": 999,
    "source": "triage-service"
  }
}
```

## Configuration

### Environment Variables

Add to your `.env` file:

```env
RABBITMQ_URL="amqp://admin:admin@localhost:5672"
RABBITMQ_QUEUE_TRIAGE_EVENTS="triage.events"
RABBITMQ_EXCHANGE_TRIAGE="triage.exchange"
```

### Docker Configuration

RabbitMQ is configured in `docker-compose.yml`:

```yaml
rabbitmq:
  image: rabbitmq:4-management-alpine
  container_name: rmq
  ports:
    - "5672:5672"   # AMQP port
    - "15672:15672" # Management UI port
  environment:
    RABBITMQ_DEFAULT_USER: admin
    RABBITMQ_DEFAULT_PASS: admin
```

## Usage

### Starting Services

1. **Start RabbitMQ:**

   ```bash
   docker-compose up rabbitmq -d
   ```

2. **Start Triage Service:**

   ```bash
   npm run start:dev triage
   ```

3. **Access RabbitMQ Management UI:**

   - URL: <http://localhost:15672>
   - Username: `admin`
   - Password: `admin`

### Consuming Events

To consume events from another microservice:

```typescript
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class TriageEventsConsumer {
  @EventPattern('triage.created')
  async handleTriageCreated(@Payload() data: any) {
    console.log('Triage created:', data);
    // Process the event
  }

  @EventPattern('triage.priority.changed')
  async handlePriorityChanged(@Payload() data: any) {
    console.log('Priority changed:', data);
    // Send notifications, update dashboards, etc.
  }

  @EventPattern('vital-signs.registered')
  async handleVitalSignsRegistered(@Payload() data: any) {
    console.log('Vital signs registered:', data);
    // Check for critical values and alert if necessary
  }
}
```

### Consumer Service Configuration

In your consumer service's `main.ts`:

```typescript
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Connect as microservice consumer
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: 'notifications.queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
```

## Use Cases Integration

Events are automatically published from:

- `RegisterTriageUseCase` → `triage.created` + `vital-signs.registered`
- `UpdatePriorityUseCase` → `triage.priority.changed`
- `UpdateTriageUseCase` → `triage.updated`
- `DeleteTriageUseCase` → `triage.deleted`
- `RegisterVitalSignsUseCase` → `vital-signs.registered`

## Monitoring

### RabbitMQ Management UI

Monitor queue status, message rates, and connections:

- Navigate to <http://localhost:15672>
- Check "Queues" tab for `triage.events` queue
- View message rates and consumer connections

### Application Logs

The `RabbitMQService` logs all published events:

```bash
[RabbitMQService] RabbitMQ client connected successfully
[RabbitMQService] Event published: triage.created
[RabbitMQService] Event published: vital-signs.registered
```

## Error Handling

- Failed event publications are logged but don't block the main operation
- RabbitMQ connection failures are caught and logged
- Consider implementing a dead letter queue for failed messages in production

## Benefits

✅ **Decoupling** - Services don't need direct HTTP calls  
✅ **Scalability** - Multiple consumers can process events  
✅ **Reliability** - Messages are persisted (durable queues)  
✅ **Audit Trail** - All triage operations are tracked  
✅ **Real-time Notifications** - Instant updates across services  
✅ **Clean Architecture** - Domain logic remains pure

## Future Enhancements

- [ ] Implement retry mechanisms for failed events
- [ ] Add dead letter queues for error handling
- [ ] Create a notifications microservice as event consumer
- [ ] Add event versioning for backward compatibility
- [ ] Implement event replay capabilities for debugging
- [ ] Add metrics and monitoring dashboards
