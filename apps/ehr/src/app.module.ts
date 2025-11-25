import { Module } from '@nestjs/common';
import { EhrModule } from './presentation/ehr.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '..', '..', '..', '.env'),
    }),
    EhrModule,
  ],
})
export class AppModule {}
