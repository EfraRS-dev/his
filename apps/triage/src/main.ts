import { NestFactory } from '@nestjs/core';
import { TriageModule } from './triage.module';

async function bootstrap() {
  const app = await NestFactory.create(TriageModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
