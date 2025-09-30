import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PatientsModule } from './presentation/patients.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: join(__dirname, '..', '.env')
     }),
    PatientsModule,
  ],
})
export class AppModule {}