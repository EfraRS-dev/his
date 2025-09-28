import { NestFactory } from '@nestjs/core';
import { PatientsModule } from './presentation/controllers/patients.module';

async function bootstrap() {
  const app = await NestFactory.create(PatientsModule);
  await app.listen(process.env.port ?? 3000);
}
void bootstrap();
