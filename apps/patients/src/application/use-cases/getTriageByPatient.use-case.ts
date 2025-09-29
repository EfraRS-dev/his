import { Inject, Injectable } from '@nestjs/common';
import type { PatientRepository } from '../../domain/patient.repository.port';
import { Triage } from '../dto/triage.dto';
import { PATIENT_REPOSITORY } from '../token';

@Injectable()
export class GetTriageByPatientUseCase{
    constructor(
        @Inject(PATIENT_REPOSITORY) private readonly patientRepo: PatientRepository
    ) {}

    async execute(Id: number): Promise<Triage[]>{
        const patient = await this.patientRepo.findPatientById(Id);
        
        if(patient === null){
            throw new Error('Patient not found');
        }

        return this.patientRepo.getTriages(Id);
    }
}