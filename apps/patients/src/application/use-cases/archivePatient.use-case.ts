import { Inject, Injectable } from '@nestjs/common';
import { Patient } from '../../domain/patient';
import type { PatientRepository } from '../../domain/patient.repository.port';
import { PATIENT_REPOSITORY } from '../token';

@Injectable()
export class ArchivePatientUseCase {
    constructor(
        @Inject(PATIENT_REPOSITORY) private readonly patientRepo: PatientRepository
    ) {}

    async execute(Id: number): Promise<Patient> {
        const patient = await this.patientRepo.findPatientById(Id);
        
        if(patient === null){
            throw new Error('Patient not found');
        }

        const archivedPatient = new Patient(
            patient.patientId,
            patient.userId,
            patient.documentType,
            patient.documentNumber,
            patient.firstName,
            patient.lastName,
            patient.birthDate,
            patient.gender,
            patient.address,
            patient.phone,
            patient.email,
            patient.emergencyContact,
            patient.createdAt,
            'archived'
        )

        console.log(archivedPatient)

        return this.patientRepo.update(archivedPatient)
    }
}