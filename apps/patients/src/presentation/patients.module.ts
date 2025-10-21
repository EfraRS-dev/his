import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { PatientRegisterUseCase } from '../application/use-cases/registerPatient.use-case';
import { PatientRepository } from '../domain/patient.repository.port';
import { PATIENT_REPOSITORY } from '../application/token';
import { UpdatePatientUseCase } from '../application/use-cases/updatePatient.use-case';
import { GetTriageByPatientUseCase } from '../application/use-cases/getTriageByPatient.use-case';
import { GetPatientUseCase } from '../application/use-cases/getPatient.use-case';
import { GetMedicalHistoryByPatientUseCase } from '../application/use-cases/getMedicalHistoryByPatient.use-case';
import { ArchivePatientUseCase } from '../application/use-cases/archivePatient.use-case';
import { PrismaService } from '../infrastructure/database/prisma.service';
import { PrismaPatientRepository } from '../infrastructure/database/prisma-patient.repository';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [PatientsController],
  providers: [
    PrismaService,
    {
      provide: PATIENT_REPOSITORY,
      useFactory: (prisma: PrismaService) => new PrismaPatientRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: ArchivePatientUseCase,
      useFactory: (repo: PatientRepository) => new ArchivePatientUseCase(repo),
      inject: [PATIENT_REPOSITORY]
    },
    {
      provide: GetMedicalHistoryByPatientUseCase,
      useFactory: (repo: PatientRepository, repo2: HttpService) => new GetMedicalHistoryByPatientUseCase(repo, repo2),
      inject: [PATIENT_REPOSITORY, HttpService]
    },
    {
      provide: GetPatientUseCase,
      useFactory: (repo: PatientRepository) => new GetPatientUseCase(repo),
      inject: [PATIENT_REPOSITORY]
    },
    {
      provide: GetTriageByPatientUseCase,
      useFactory: (repo: PatientRepository, repo2: HttpService) => new GetTriageByPatientUseCase(repo, repo2),
      inject: [PATIENT_REPOSITORY, HttpService]
    },
    {
      provide: PatientRegisterUseCase,
      useFactory: (repo: PatientRepository, repo2: HttpService) => new PatientRegisterUseCase(repo, repo2),
      inject: [PATIENT_REPOSITORY, HttpService]
    },
    {
      provide: UpdatePatientUseCase,
      useFactory: (repo: PatientRepository) => new UpdatePatientUseCase(repo),
      inject: [PATIENT_REPOSITORY]
    },
  ],
})
export class PatientsModule { }
