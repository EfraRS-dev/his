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
