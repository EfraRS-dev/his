import { Module } from '@nestjs/common';
import { EhrController } from './controllers/ehr.controller';
import { PrismaService } from '../infrastructure/database/prisma.service';
import {
  ANTECEDENT_REPOSITORY,
  CLINICAL_ENTRY_REPOSITORY,
  MEDICAL_HISTORY_REPOSITORY,
  EVENT_PUBLISHER,
} from '../application/tokens';
import { PrismaAntecedentRepository } from '../infrastructure/database/prisma-antecedent.repository';
import { PrismaClinicalEntryRepository } from '../infrastructure/database/prisma-clinical-entry.repository';
import { PrismaMedicalHistory } from '../infrastructure/database/prisma-medical-history.repository';
import { CreateAntecedentUseCase } from '../application/use-cases/antecedent/create-antecedent.usecase';
import { AntecedentRepositoryPort } from '../domain/repositories/antecedent.repository.port';
import { DeleteAntecedentUseCase } from '../application/use-cases/antecedent/delete-antecedent.usecase';
import { UpdateAntecedentUseCase } from '../application/use-cases/antecedent/update-antecedent.usecase';
import { CreateClinicalEntryUseCase } from '../application/use-cases/clinical-entry/create-clinicalEntry.usecase';
import { ClinicalEntryRepositoryPort } from '../domain/repositories/clinical-entry.repository.port';
import { UpdateClinicalEntryUseCase } from '../application/use-cases/clinical-entry/update-clinicalEntry.usecase';
import { CreateMedicalHistoryUseCase } from '../application/use-cases/medical-history/create-medialHistory.usecase';
import { MedicalHistoryRepositoryPort } from '../domain/repositories/medical-history.repository.port';
import { ArchiveMedicalHistoryUseCase } from '../application/use-cases/medical-history/archive-medicalHistory.usecase';
import { GetMedicalHistoryCompleteUseCase } from '../application/use-cases/medical-history/getMedicalHistoryComplete.usecase';
import { UnarchiveMedicalHistoryUseCase } from '../application/use-cases/medical-history/unarchive-medicalHistory.usecase';
import { RabbitMQModule } from '../infrastructure/messaging/rabbitmq.module';
import { RabbitMQService } from '../infrastructure/messaging/rabbitmq.service';

@Module({
  imports: [RabbitMQModule],
  controllers: [EhrController],
  providers: [
    PrismaService,
    {
      provide: EVENT_PUBLISHER,
      useExisting: RabbitMQService,
    },
    {
      provide: ANTECEDENT_REPOSITORY,
      useFactory: (prisma: PrismaService) =>
        new PrismaAntecedentRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: CLINICAL_ENTRY_REPOSITORY,
      useFactory: (prisma: PrismaService) =>
        new PrismaClinicalEntryRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: MEDICAL_HISTORY_REPOSITORY,
      useFactory: (prisma: PrismaService) => new PrismaMedicalHistory(prisma),
      inject: [PrismaService],
    },
    {
      provide: CreateAntecedentUseCase,
      useFactory: (
        repo: AntecedentRepositoryPort,
        historyRepo: MedicalHistoryRepositoryPort,
        eventPublisher,
      ) => new CreateAntecedentUseCase(repo, historyRepo, eventPublisher),
      inject: [
        ANTECEDENT_REPOSITORY,
        MEDICAL_HISTORY_REPOSITORY,
        EVENT_PUBLISHER,
      ],
    },
    {
      provide: DeleteAntecedentUseCase,
      useFactory: (
        repo: AntecedentRepositoryPort,
        historyRepo: MedicalHistoryRepositoryPort,
        eventPublisher,
      ) => new DeleteAntecedentUseCase(repo, historyRepo, eventPublisher),
      inject: [
        ANTECEDENT_REPOSITORY,
        MEDICAL_HISTORY_REPOSITORY,
        EVENT_PUBLISHER,
      ],
    },
    {
      provide: UpdateAntecedentUseCase,
      useFactory: (
        repo: AntecedentRepositoryPort,
        historyRepo: MedicalHistoryRepositoryPort,
        eventPublisher,
      ) => new UpdateAntecedentUseCase(repo, historyRepo, eventPublisher),
      inject: [
        ANTECEDENT_REPOSITORY,
        MEDICAL_HISTORY_REPOSITORY,
        EVENT_PUBLISHER,
      ],
    },
    {
      provide: CreateClinicalEntryUseCase,
      useFactory: (
        repo: ClinicalEntryRepositoryPort,
        historyRepo: MedicalHistoryRepositoryPort,
      ) => new CreateClinicalEntryUseCase(repo, historyRepo),
      inject: [CLINICAL_ENTRY_REPOSITORY, MEDICAL_HISTORY_REPOSITORY],
    },
    {
      provide: UpdateClinicalEntryUseCase,
      useFactory: (
        repo: ClinicalEntryRepositoryPort,
        historyRepo: MedicalHistoryRepositoryPort,
      ) => new UpdateClinicalEntryUseCase(repo, historyRepo),
      inject: [CLINICAL_ENTRY_REPOSITORY, MEDICAL_HISTORY_REPOSITORY],
    },
    {
      provide: CreateMedicalHistoryUseCase,
      useFactory: (
        repo: MedicalHistoryRepositoryPort,
        eventPublisher,
      ) => new CreateMedicalHistoryUseCase(repo, eventPublisher),
      inject: [MEDICAL_HISTORY_REPOSITORY, EVENT_PUBLISHER],
    },
    {
      provide: ArchiveMedicalHistoryUseCase,
      useFactory: (
        repo: MedicalHistoryRepositoryPort,
        eventPublisher,
      ) => new ArchiveMedicalHistoryUseCase(repo, eventPublisher),
      inject: [MEDICAL_HISTORY_REPOSITORY, EVENT_PUBLISHER],
    },
    {
      provide: UnarchiveMedicalHistoryUseCase,
      useFactory: (
        repo: MedicalHistoryRepositoryPort,
        eventPublisher,
      ) => new UnarchiveMedicalHistoryUseCase(repo, eventPublisher),
      inject: [MEDICAL_HISTORY_REPOSITORY, EVENT_PUBLISHER],
    },
    {
      provide: GetMedicalHistoryCompleteUseCase,
      useFactory: (repo: MedicalHistoryRepositoryPort) =>
        new GetMedicalHistoryCompleteUseCase(repo),
      inject: [MEDICAL_HISTORY_REPOSITORY],
    },
  ],
})
export class EhrModule {}
