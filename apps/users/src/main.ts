import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Servicio de Usuarios')
    .setDescription('Documentacion para el microservicio de usuarios')
    .setVersion('1.0')
    .addTag('Usuarios')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('users/api', app, document);

  const port = configService.get<number>('PORT');
  await app.listen(port ?? 3002);
}
void bootstrap();
