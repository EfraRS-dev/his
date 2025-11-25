import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQService } from './rabbitmq.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'TRIAGE_MESSAGING_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          const rabbitMQUrl = configService.get<string>('RABBITMQ_URL');
          const queueName = configService.get<string>(
            'RABBITMQ_QUEUE_TRIAGE_EVENTS',
          );

          if (!rabbitMQUrl) {
            throw new Error('RABBITMQ_URL is not defined');
          }
          if (!queueName) {
            throw new Error('RABBITMQ_QUEUE_TRIAGE_EVENTS is not defined');
          }

          return {
            transport: Transport.RMQ,
            options: {
              urls: [rabbitMQUrl],
              queue: queueName,
              queueOptions: {
                durable: true,
              },
              prefetchCount: 1,
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [RabbitMQService],
  exports: [RabbitMQService, ClientsModule],
})
export class RabbitMQModule {}
