import { Inject, Injectable } from '@nestjs/common';
import { Patient } from '../../domain/patient';
import type { PatientRepository } from '../../domain/patient.repository.port';
import { PATIENT_REPOSITORY } from '../token';

@Injectable()
export class GetAllPatientsUseCase {
  constructor(
    @Inject(PATIENT_REPOSITORY) private readonly patientRepo: PatientRepository,
  ) {}

  async execute(includeArchived: boolean): Promise<Patient[]> {
    const patients = await this.patientRepo.getAllPatients(includeArchived);
    return patients;
  }
}
