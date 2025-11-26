import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4000', 
    credentials: true,
  });

  await app.listen(3000);
  console.log('🚀 API Gateway running on http://localhost:3000');
}
void bootstrap();
