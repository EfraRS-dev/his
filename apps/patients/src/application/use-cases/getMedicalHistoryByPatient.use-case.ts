import { Inject, Injectable } from '@nestjs/common';
import type { PatientRepository } from '../../domain/patient.repository';
import { MedicalHistory } from '../dto/medicalHistory.dto';
import { PATIENT_REPOSITORY } from '../token';

@Injectable()
export class GetMedicalHistoryByPatientUseCase{
    constructor(
        @Inject(PATIENT_REPOSITORY) private readonly patientRepo: PatientRepository
    ) {}

    async execute(Id: number): Promise<MedicalHistory[]>{
        const patient = await this.patientRepo.findPatientById(Id);
        
        if(patient === null){
            throw new Error('Patient not found');
        }

        return this.patientRepo.getMedicalHistories(Id);
    }
}