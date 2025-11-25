import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqp-connection-manager';
import { ChannelWrapper } from 'amqp-connection-manager';
import { NotificationStore } from './notification-store.service';

@Injectable()
export class NotificationConsumerService implements OnModuleInit {
  private readonly logger = new Logger(NotificationConsumerService.name);
  private connection: amqp.AmqpConnectionManager;
  private channelWrappers: ChannelWrapper[] = [];
  private readonly notificationStore = new NotificationStore();

  private readonly queues = [
    {
      name: 'triage.events',
      source: 'triage-service',
      configKey: 'RABBITMQ_QUEUE_TRIAGE_EVENTS',
    },
    {
      name: 'patients.events',
      source: 'patients-service',
      configKey: 'RABBITMQ_QUEUE_PATIENTS_EVENTS',
    },
    {
      name: 'ehr.events',
      source: 'ehr-service',
      configKey: 'RABBITMQ_QUEUE_EHR_EVENTS',
    },
  ];

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.connect();
  }

  private connect() {
    try {
      const rabbitMQUrl = this.configService.get<string>('RABBITMQ_URL');

      if (!rabbitMQUrl) {
        this.logger.warn(
          'RABBITMQ_URL not configured, skipping notification consumer',
        );
        return;
      }

      this.connection = amqp.connect([rabbitMQUrl]);

      this.connection.on('connect', () => {
        this.logger.log('Successfully connected to RabbitMQ');
      });

      this.connection.on('disconnect', (err) => {
        this.logger.error('Disconnected from RabbitMQ', err);
      });

      // Create a channel wrapper for each queue
      this.queues.forEach((queueConfig) => {
        const queueName =
          this.configService.get<string>(queueConfig.configKey) ||
          queueConfig.name;

        const channelWrapper = this.connection.createChannel({
          json: true,
          setup: async (channel: any) => {
            await channel.assertQueue(queueName, { durable: true });
            await channel.consume(queueName, (msg: any) => {
              if (msg) {
                this.handleMessage(msg, channel, queueConfig.source);
              }
            });
            this.logger.log(
              `Consuming messages from queue: ${queueName} (${queueConfig.source})`,
            );
          },
        });

        this.channelWrappers.push(channelWrapper);
      });
    } catch (error) {
      this.logger.error('Failed to connect to RabbitMQ', error.stack);
    }
  }

  private handleMessage(msg: any, channel: any, source: string) {
    try {
      const content = msg.content.toString();
      const event = JSON.parse(content);

      // Ensure source is set in metadata
      if (!event.metadata) {
        event.metadata = {};
      }
      if (!event.metadata.source) {
        event.metadata.source = source;
      }

      this.logger.log(
        `[${source}] Received event: ${event.eventType || 'unknown'}`,
      );
      this.logger.debug(`Event data: ${JSON.stringify(event)}`);

      // Store the notification
      this.notificationStore.addNotification(event);

      // Acknowledge the message
      channel.ack(msg);
    } catch (error) {
  async onModuleDestroy() {
    try {
      // Close all channel wrappers
      for (const wrapper of this.channelWrappers) {
        await wrapper.close();
      }
      if (this.connection) {
        await this.connection.close();
      }
      this.logger.log('RabbitMQ connection closed');
    } catch (error) {
      this.logger.error('Error closing RabbitMQ connection', error.stack);
    }
  }
}       await this.channelWrapper.close();
      }
      if (this.connection) {
        await this.connection.close();
      }
      this.logger.log('RabbitMQ connection closed');
    } catch (error) {
      this.logger.error('Error closing RabbitMQ connection', error.stack);
    }
  }
}
