import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4000',
    credentials: true,
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('HIS API Gateway')
    .setDescription('API Gateway del HIS')
    .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
      },
      'bearer',)
    .addTag('patients', 'Patient management operations')
    .addTag('users', 'User authentication and management')
    .addTag('triage', 'Triage and vital signs management')
    .addTag('ehr', 'Electronic Health Records')
    .addTag('roles', 'Role management')
    .addTag('notifications', 'Real-time notifications via SSE')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('🚀 API Gateway running on http://localhost:3000');
  console.log(
    '📚 Swagger documentation available at http://localhost:3000/api',
  );
}
void bootstrap();
