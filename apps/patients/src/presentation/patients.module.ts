import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { PatientRegisterUseCase } from '../application/use-cases/registerPatient.use-case';
import { PatientRepository } from '../domain/patient.repository.port';
import { PATIENT_REPOSITORY, EVENT_PUBLISHER } from '../application/token';
import { UpdatePatientUseCase } from '../application/use-cases/updatePatient.use-case';
import { GetTriageByPatientUseCase } from '../application/use-cases/getTriageByPatient.use-case';
import { GetPatientUseCase } from '../application/use-cases/getPatient.use-case';
import { GetMedicalHistoryByPatientUseCase } from '../application/use-cases/getMedicalHistoryByPatient.use-case';
import { ArchivePatientUseCase } from '../application/use-cases/archivePatient.use-case';
import { PrismaService } from '../infrastructure/database/prisma.service';
import { PrismaPatientRepository } from '../infrastructure/database/prisma-patient.repository';
import { HttpModule, HttpService } from '@nestjs/axios';
import { GetAllPatientsUseCase } from '../application/use-cases/getAllPatients.use-case';
import { UnarchivePatientUseCase } from '../application/use-cases/unarchivePatient.use-case';
import { RabbitMQModule } from '../infrastructure/messaging/rabbitmq.module';
import { RabbitMQService } from '../infrastructure/messaging/rabbitmq.service';

@Module({
  imports: [HttpModule, RabbitMQModule],
  controllers: [PatientsController],
  providers: [
    PrismaService,
    {
      provide: EVENT_PUBLISHER,
      useExisting: RabbitMQService,
    },
    {
      provide: PATIENT_REPOSITORY,
      useFactory: (prisma: PrismaService) =>
        new PrismaPatientRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: ArchivePatientUseCase,
      useFactory: (repo: PatientRepository, eventPublisher) =>
        new ArchivePatientUseCase(repo, eventPublisher),
      inject: [PATIENT_REPOSITORY, EVENT_PUBLISHER],
    },
    {
      provide: GetMedicalHistoryByPatientUseCase,
      useFactory: (repo: PatientRepository, repo2: HttpService) =>
        new GetMedicalHistoryByPatientUseCase(repo, repo2),
      inject: [PATIENT_REPOSITORY, HttpService],
    },
    {
      provide: GetPatientUseCase,
      useFactory: (repo: PatientRepository) => new GetPatientUseCase(repo),
      inject: [PATIENT_REPOSITORY],
    },
    {
      provide: GetTriageByPatientUseCase,
      useFactory: (repo: PatientRepository, repo2: HttpService) =>
        new GetTriageByPatientUseCase(repo, repo2),
      inject: [PATIENT_REPOSITORY, HttpService],
    },
    {
      provide: PatientRegisterUseCase,
      useFactory: (
        repo: PatientRepository,
        repo2: HttpService,
        eventPublisher,
      ) => new PatientRegisterUseCase(repo, repo2, eventPublisher),
      inject: [PATIENT_REPOSITORY, HttpService, EVENT_PUBLISHER],
    },
    {
      provide: UpdatePatientUseCase,
      useFactory: (repo: PatientRepository, eventPublisher) =>
        new UpdatePatientUseCase(repo, eventPublisher),
      inject: [PATIENT_REPOSITORY, EVENT_PUBLISHER],
    },
    {
      provide: GetAllPatientsUseCase,
      useFactory: (repo: PatientRepository) => new GetAllPatientsUseCase(repo),
      inject: [PATIENT_REPOSITORY],
    },
    {
      provide: UnarchivePatientUseCase,
      useFactory: (repo: PatientRepository) =>
        new UnarchivePatientUseCase(repo),
      inject: [PATIENT_REPOSITORY],
    },
  ],
})
export class PatientsModule {}
