import { NestFactory } from '@nestjs/core';
import { TriageModule } from './triage.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(TriageModule);

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

  const port = configService.get<number>('PORT');
  await app.listen(port ?? 3005);
}
void bootstrap();
