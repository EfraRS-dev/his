import { Module } from '@nestjs/common';
import { EhrController } from './controllers/ehr.controller';
import { PrismaService } from '../infrastructure/database/prisma.service';
import { ANTECEDENT_REPOSITORY, CLINICAL_ENTRY_REPOSITORY, MEDICAL_HISTORY_REPOSITORY } from '../application/tokens';
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
import { ArchiveMedicalHistoryUeCase } from '../application/use-cases/medical-history/archive-medicalHistory.usecase';
import { GetMedicalHistoryCompleteUseCase } from '../application/use-cases/medical-history/getMedicalHistoryComplete.usecase';


@Module({
  controllers: [EhrController],
  providers: [
    PrismaService,
    {
      provide: ANTECEDENT_REPOSITORY,
      useFactory: (prisma: PrismaService) => new PrismaAntecedentRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: CLINICAL_ENTRY_REPOSITORY,
      useFactory: (prisma: PrismaService) => new PrismaClinicalEntryRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: MEDICAL_HISTORY_REPOSITORY,
      useFactory: (prisma: PrismaService) => new PrismaMedicalHistory(prisma),
      inject: [PrismaService],
    },
    {
      provide: CreateAntecedentUseCase,
      useFactory: (repo: AntecedentRepositoryPort) => new CreateAntecedentUseCase(repo),
      inject: [ANTECEDENT_REPOSITORY],
    },
    {
      provide: DeleteAntecedentUseCase,
      useFactory: (repo: AntecedentRepositoryPort) => new DeleteAntecedentUseCase(repo),
      inject: [ANTECEDENT_REPOSITORY],
    },
    {
      provide: UpdateAntecedentUseCase,
      useFactory: (repo: AntecedentRepositoryPort) => new UpdateAntecedentUseCase(repo),
      inject: [ANTECEDENT_REPOSITORY],
    },
    {
      provide: CreateClinicalEntryUseCase,
      useFactory: (repo: ClinicalEntryRepositoryPort) => new CreateClinicalEntryUseCase(repo),
      inject: [CLINICAL_ENTRY_REPOSITORY],
    },
    {
      provide: UpdateClinicalEntryUseCase,
      useFactory: (repo: ClinicalEntryRepositoryPort) => new UpdateClinicalEntryUseCase(repo),
      inject: [CLINICAL_ENTRY_REPOSITORY],
    },
    {
      provide: CreateMedicalHistoryUseCase,
      useFactory: (repo: MedicalHistoryRepositoryPort) => new CreateMedicalHistoryUseCase(repo),
      inject: [MEDICAL_HISTORY_REPOSITORY],
    },
    {
      provide: ArchiveMedicalHistoryUeCase,
      useFactory: (repo: MedicalHistoryRepositoryPort) => new ArchiveMedicalHistoryUeCase(repo),
      inject: [MEDICAL_HISTORY_REPOSITORY],
    },
    {
      provide: GetMedicalHistoryCompleteUseCase,
      useFactory: (repo: MedicalHistoryRepositoryPort) => new GetMedicalHistoryCompleteUseCase(repo),
      inject: [MEDICAL_HISTORY_REPOSITORY]
    },
  ],
})
export class EhrModule {}
