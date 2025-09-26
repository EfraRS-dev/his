import { NestFactory } from '@nestjs/core';
import { TriageModule } from './triage.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(TriageModule);

  const config = new DocumentBuilder()
    .setTitle('Triage Service API')
    .setDescription('API documentation for Triage Microservice')
    .setVersion('1.0')
    .addTag('triage')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
