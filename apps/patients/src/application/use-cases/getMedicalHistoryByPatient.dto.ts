import { PatientRepository } from '../../domain/patient.repository';
import { MedicalHistory } from '../dto/medicalHistory.dto';

export class GetMedicalHistoryByPatientUseCase{
    constructor(
        private readonly patientRepo: PatientRepository
    ) {}

    async execute(Id: number): Promise<MedicalHistory[]>{
        const patient = await this.patientRepo.findPatientById(Id);
        
        if(patient === null){
            throw new Error('Patient not found');
        }

        return this.patientRepo.getMedicalHistories(Id);
    }
}