import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PatientsModule } from './presentation/patients.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PatientsModule,
  ],
})
export class AppModule {}