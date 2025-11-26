import {
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from '../../application/ports/event-publisher.port';
import type { TriageEvent } from '../../domain/events';

@Injectable()
export class RabbitMQService
  implements IEventPublisher, OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(RabbitMQService.name);

  constructor(
    @Inject('TRIAGE_MESSAGING_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  publishEvent(event: TriageEvent): void {
    try {
      // Determine event type based on the properties present in the event
      let eventType = 'triage.event';
      if (
        'triageId' in event &&
        'urgencyLevel' in event &&
        'nurseId' in event
      ) {
        eventType = 'triage.created';
      } else if ('triageId' in event && 'changes' in event) {
        eventType = 'triage.updated';
      } else if ('oldUrgencyLevel' in event && 'newUrgencyLevel' in event) {
        eventType = 'priority.changed';
      } else if ('vitalSignsId' in event && 'criticalValues' in event) {
        eventType = 'vital-signs.registered';
      } else if (
        'triageId' in event &&
        'patientId' in event &&
        Object.keys(event).length === 3
      ) {
        eventType = 'triage.deleted';
      }

      this.client.emit(eventType, event);
      this.logger.log(`📤 Event published: ${eventType}`, event);
    } catch (error) {
      this.logger.error(`❌ Failed to publish event`, error);
      throw error;
    }
  }

  async onModuleInit() {
    try {
      await this.client.connect();
      this.logger.log('RabbitMQ client connected successfully');
    } catch (error) {
      this.logger.error('Failed to connect to RabbitMQ', error.stack);
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await this.client.close();
      this.logger.log('RabbitMQ client disconnected');
    } catch (error) {
      this.logger.error('Error disconnecting from RabbitMQ', error.stack);
    }
  }
}
