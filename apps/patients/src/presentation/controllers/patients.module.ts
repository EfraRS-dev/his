import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { PatientRegisterUseCase } from '../../application/use-cases/registerPatient.use-case';
import { PATIENT_REPOSITORY } from '../../application/token';

@Module({
  controllers: [PatientsController],
  providers: [
    {
      provide: PatientRegisterUseCase,
      useFactory: (repo: any) => new PatientRegisterUseCase(repo),
      inject: [PATIENT_REPOSITORY]
    }
  ],
})
export class PatientsModule {}
