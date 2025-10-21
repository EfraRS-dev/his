import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { join } from 'path';
import { TriageController } from './presentation/controllers/triage.controller';
import { TriageService } from './application/services/triage.service';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { PrismaTriageRepository } from './infrastructure/repositories/prisma-triage.repository';
import { PrismaVitalSignsRepository } from './infrastructure/repositories/prisma-vital-signs.repository';
import { PatientsServiceHttpClient } from './infrastructure/adapters/patients-service-http.client';
import { UsersServiceHttpClient } from './infrastructure/adapters/users-service-http.client';
import {
  TRIAGE_REPOSITORY_TOKEN,
  VITAL_SIGNS_REPOSITORY_TOKEN,
  PATIENTS_SERVICE_CLIENT_TOKEN,
  USERS_SERVICE_CLIENT_TOKEN,
} from './application/tokens';
import {
  CreateTriageUseCase,
  GetTriageUseCase,
  RegisterTriageUseCase,
  GetActiveTriageUseCase,
  GetTriageByPatientUseCase,
  ListPatientsByPriorityUseCase,
  UpdateTriageUseCase,
  UpdatePriorityUseCase,
  DeleteTriageUseCase,
  RegisterVitalSignsUseCase,
  GetVitalSignsUseCase,
  GetVitalSignsByTriageUseCase,
} from './application/use-cases';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '..', '.env'), // apps/triage/.env
      isGlobal: true,
      cache: true,
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        timeout: configService.get<number>('HTTP_CLIENT_TIMEOUT', 5000),
        maxRedirects: 5,
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
  ],
  controllers: [TriageController],
  providers: [
    // Service
    TriageService,
    // Use cases
    CreateTriageUseCase,
    RegisterTriageUseCase,
    GetTriageUseCase,
    GetActiveTriageUseCase,
    GetTriageByPatientUseCase,
    ListPatientsByPriorityUseCase,
    UpdateTriageUseCase,
    UpdatePriorityUseCase,
    DeleteTriageUseCase,
    RegisterVitalSignsUseCase,
    GetVitalSignsUseCase,
    GetVitalSignsByTriageUseCase,
    // Repository adapters
    PrismaTriageRepository,
    PrismaVitalSignsRepository,
    // HTTP service clients
    PatientsServiceHttpClient,
    UsersServiceHttpClient,
    // Token bindings
    { provide: TRIAGE_REPOSITORY_TOKEN, useExisting: PrismaTriageRepository },
    {
      provide: VITAL_SIGNS_REPOSITORY_TOKEN,
      useExisting: PrismaVitalSignsRepository,
    },
    {
      provide: PATIENTS_SERVICE_CLIENT_TOKEN,
      useExisting: PatientsServiceHttpClient,
    },
    {
      provide: USERS_SERVICE_CLIENT_TOKEN,
      useExisting: UsersServiceHttpClient,
    },
  ],
})
export class TriageModule {}
