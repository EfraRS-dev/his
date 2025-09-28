import { Patient } from '../../domain/patient';
import { PatientRepository } from '../../domain/patient.repository';

export class ArchivePatientUseCase {
    constructor(
        private readonly patientRepo: PatientRepository
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
            patient.registeredAt,
            'archived'
        )

        return this.patientRepo.update(archivedPatient)
    }
}