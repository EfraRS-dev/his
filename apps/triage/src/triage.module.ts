import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { TriageController } from './presentation/controllers/triage.controller';
import { TriageService } from './application/services/triage.service';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { PrismaTriageRepository } from './infrastructure/repositories/prisma-triage.repository';
import { PrismaVitalSignsRepository } from './infrastructure/repositories/prisma-vital-signs.repository';
import {
  TRIAGE_REPOSITORY_TOKEN,
  VITAL_SIGNS_REPOSITORY_TOKEN,
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
    // Token bindings
    { provide: TRIAGE_REPOSITORY_TOKEN, useExisting: PrismaTriageRepository },
    {
      provide: VITAL_SIGNS_REPOSITORY_TOKEN,
      useExisting: PrismaVitalSignsRepository,
    },
  ],
})
export class TriageModule {}
