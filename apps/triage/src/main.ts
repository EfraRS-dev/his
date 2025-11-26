import { NestFactory } from '@nestjs/core';
import { TriageModule } from './triage.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(TriageModule);
  const logger = new Logger('Main');

  const configService = app.get<ConfigService>(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Triage - Microservice')
    .setDescription('API documentation for triage microservice.')
    .setVersion('1.0')
    .addTag('triage')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('triage/api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('RABBITMQ_URL')],
      queue: configService.get<string>('RABBITMQ_QUEUE') || 'my_queue',
      queueOptions: { durable: true },
      noAck: false,
      prefetchCount: 1,
    },
  });

  await app.startAllMicroservices();
  const port = configService.get<number>('PORT') ?? 3005;
  await app.listen(port);
  logger.log(`🚀 Triage service running on port ${port}`);
  logger.log(
    `📚 Swagger documentation available at http://localhost:${port}/triage/api`,
  );
}
void bootstrap();
