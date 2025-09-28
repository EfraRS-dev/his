import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { PatientRegisterUseCase } from '../application/use-cases/registerPatient.use-case';
import { PatientRepository } from '../domain/patient.repository';
import { PATIENT_REPOSITORY } from '../application/token';
import { UpdatePatientUseCase } from '../application/use-cases/updatePatient.use-case';
import { GetTriageByPatientUseCase } from '../application/use-cases/getTriageByPatient.use-case';
import { GetPatientUseCase } from '../application/use-cases/getPatient.use-case';
import { GetMedicalHistoryByPatientUseCase } from '../application/use-cases/getMedicalHistoryByPatient.use-case';
import { ArchivePatientUseCase } from '../application/use-cases/archivePatient.use-case';

@Module({
  controllers: [PatientsController],
  providers: [
    {
      provide: ArchivePatientUseCase,
      useFactory: (repo: PatientRepository) => new PatientRegisterUseCase(repo),
      inject: [PATIENT_REPOSITORY]
    },
    {
      provide: GetMedicalHistoryByPatientUseCase,
      useFactory: (repo: PatientRepository) => new PatientRegisterUseCase(repo),
      inject: [PATIENT_REPOSITORY]
    },
    {
      provide: GetPatientUseCase,
      useFactory: (repo: PatientRepository) => new PatientRegisterUseCase(repo),
      inject: [PATIENT_REPOSITORY]
    },
    {
      provide: GetTriageByPatientUseCase,
      useFactory: (repo: PatientRepository) => new PatientRegisterUseCase(repo),
      inject: [PATIENT_REPOSITORY]
    },
    {
      provide: PatientRegisterUseCase,
      useFactory: (repo: PatientRepository) => new PatientRegisterUseCase(repo),
      inject: [PATIENT_REPOSITORY]
    },
    {
      provide: UpdatePatientUseCase,
      useFactory: (repo: PatientRepository) => new PatientRegisterUseCase(repo),
      inject: [PATIENT_REPOSITORY]
    },
  ],
})
export class PatientsModule {}
