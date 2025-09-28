import { Patient } from '../../domain/patient';
import { PatientRepository } from '../../domain/patient.repository';
import { UpdatePatientDto } from '../dto/updatePatient.dto';

export class UpdatePatientUseCase {
    constructor(
        private readonly patientRepo: PatientRepository
    ) {}

    async execute(updateInput: UpdatePatientDto): Promise<Patient> {
        const patient = await this.patientRepo.findPatientById(updateInput.patientId);

        if(patient === null){
            throw new Error('Patient not found');
        }

        const updatedPatient = new Patient(
            patient.patientId,
            patient.userId,
            patient.documentType,
            patient.documentNumber,
            patient.firstName,
            patient.lastName,
            patient.birthDate,
            patient.gender,
            updateInput.address ?? patient.address,
            updateInput.phone ?? patient.phone,
            updateInput.email ?? patient.email,
            updateInput.emergencyContact ?? patient.emergencyContact,
            patient.registeredAt,
            patient.status
        )

        return this.patientRepo.update(updatedPatient)
    }
}