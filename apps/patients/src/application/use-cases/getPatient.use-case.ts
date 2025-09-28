import { Patient } from '../../domain/patient';
import { PatientRepository } from '../../domain/patient.repository';
import { GetPatientDto } from '../dto/getPatient.dto';

export class GetPatientUseCase {
    constructor(
        private readonly patientRepo: PatientRepository
    ) {}

    async execute(searchInput: GetPatientDto): Promise<Patient | null> {

        let patient: Patient | null = null;

        if (searchInput.criteria === 'document') {
            patient = await this.patientRepo.findPatientByDocument(searchInput.documentType!, searchInput.documentNumber!);
        }
        if (searchInput.criteria === 'name') {
            patient = await this.patientRepo.findPatientByName(searchInput.firstName!, searchInput.lastName!);
        }
        if (searchInput.criteria === 'id') {
            patient = await this.patientRepo.findPatientById(searchInput.patientId!);
        }
        if (patient !== null) {
                return patient;
            }
        throw new Error('Patient not found');
    }
}