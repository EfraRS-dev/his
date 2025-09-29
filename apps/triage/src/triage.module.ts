import { Module } from '@nestjs/common';
import { TriageController } from './presentation/controllers/triage.controller';
import { TriageService } from './application/services/triage.service';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { PrismaTriageRepository } from './infrastructure/repositories/prisma-triage.repository';
import { PrismaVitalSignsRepository } from './infrastructure/repositories/prisma-vital-signs.repository';
import {
  TRIAGE_REPOSITORY_TOKEN,
  VITAL_SIGNS_REPOSITORY_TOKEN,
} from './application/tokens';
import { CreateTriageUseCase } from './application/use-cases/create-triage.use-case';
import { RegisterTriageUseCase } from './application/use-cases/register-triage.use-case';
import { GetTriageUseCase } from './application/use-cases/get-triage.use-case';
import { GetActiveTriageUseCase } from './application/use-cases/get-active-triage.use-case';
import { GetTriageByPatientUseCase } from './application/use-cases/get-triage-by-patient';
import { ListPatientsByPriorityUseCase } from './application/use-cases/list-patients-by-priority.use-case';
import { UpdateTriageUseCase } from './application/use-cases/update-triage.use-case';
import { UpdatePriorityUseCase } from './application/use-cases/update-priority.use-case';
import { DeleteTriageUseCase } from './application/use-cases/delete-triage.use-case';
import { RegisterVitalSignsUseCase } from './application/use-cases/register-vital-signs.use-case';
import { GetVitalSignsUseCase } from './application/use-cases/get-vital-signs.use-case';
import { GetVitalSignsByTriageUseCase } from './application/use-cases/get-vital-signs-by-triage.use-case';

@Module({
  imports: [PrismaModule],
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
