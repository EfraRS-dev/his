import { NestFactory } from '@nestjs/core';
import { EhrModule } from './presentation/ehr.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(EhrModule);

  const config = new DocumentBuilder()
    .setTitle('Servicio de historias medicas')
    .setDescription('Documentación para microservicio de historias medicas.')
    .setVersion('1.0')
    .addTag('ehr')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.port ?? 3000);
}
void bootstrap();
