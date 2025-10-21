import { Injectable } from '@nestjs/common';
import type { PatientRepository } from '../../domain/patient.repository.port';
import { Triage } from '../dto/triage.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class GetMedicalHistoryByPatientUseCase{
    constructor(
        private readonly patientRepo: PatientRepository,
        private readonly http: HttpService
    ) {}

    async execute(Id: number) {
        const patient = await this.patientRepo.findPatientById(Id);
        
        if(patient === null){
            throw new Error('Patient not found');
        }

        try {
            const { data } = await this.http.axiosRef.get(`http://ehr:3000/ehr/${Id}`);
            return data;
        } catch (error) {
            throw new Error('Can not get the clinical history');
        }
    }
}