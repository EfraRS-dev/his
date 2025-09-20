import { NestFactory } from '@nestjs/core';
import { EhrModule } from './ehr.module';

async function bootstrap() {
  const app = await NestFactory.create(EhrModule);
  await app.listen(process.env.port ?? 3000);
}
void bootstrap();
