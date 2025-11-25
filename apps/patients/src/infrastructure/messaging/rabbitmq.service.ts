import {
  Injectable,
  Inject,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PatientEvent } from '../../domain/events';
import { IEventPublisher } from '../../application/ports/event-publisher.port';

@Injectable()
export class RabbitMQService
  implements IEventPublisher, OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(RabbitMQService.name);

  constructor(
    @Inject('RABBITMQ_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async onModuleInit() {
    try {
      await this.client.connect();
      this.logger.log('✅ Connected to RabbitMQ successfully');
    } catch (error) {
      this.logger.error('❌ Failed to connect to RabbitMQ:', error);
    }
  }

  async onModuleDestroy() {
    await this.client.close();
    this.logger.log('RabbitMQ connection closed');
  }

  publishEvent(event: PatientEvent): void {
    try {
      this.client.emit(event.eventType, event);
      this.logger.log(`📤 Event published: ${event.eventType}`, {
        eventType: event.eventType,
        metadata: event.metadata,
      });
    } catch (error) {
      this.logger.error(
        `❌ Failed to publish event: ${event.eventType}`,
        error,
      );
      throw error;
    }
  }
}
