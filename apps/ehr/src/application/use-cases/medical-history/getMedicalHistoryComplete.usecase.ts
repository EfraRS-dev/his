import { MedicalHistory } from "apps/ehr/src/domain/entities/medical-history.entity";
import { AntecedentRepositoryPort } from "apps/ehr/src/domain/repositories/antecedent.repository.port";
import { ClinicalEntryRepositoryPort } from "apps/ehr/src/domain/repositories/clinical-entry.repository.port";
import { MedicalHistoryRepositoryPort } from "apps/ehr/src/domain/repositories/medical-history.repository.port";


export class GetMedicalHistoryCompleteUseCase {
    constructor(private readonly medicalHistoryPort: MedicalHistoryRepositoryPort){}
    
    async execute(patientId: number): Promise<MedicalHistory> {
        const medicalHistory = await this.medicalHistoryPort.findByPatientId(patientId)
        if(!medicalHistory){
            throw new Error("No medical history found for patient ${patientId}") 
        }
        return medicalHistory;
    }
}