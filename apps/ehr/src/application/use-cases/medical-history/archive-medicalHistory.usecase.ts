import { MedicalHistory } from "apps/ehr/src/domain/entities/medical-history.entity";
import { MedicalHistoryRepositoryPort } from "apps/ehr/src/domain/repositories/medical-history.repository.port";


export class ArchiveMedicalHistoryUseCase {
    constructor(private readonly medicalHistoryPort: MedicalHistoryRepositoryPort){}

    async execute(patientId: number): Promise<MedicalHistory>{
        const medicalHistory = await this.medicalHistoryPort.findByPatientId(patientId);
        if(!medicalHistory) throw new Error("medical history not found")
        if(!medicalHistory.historyId) throw new Error("medical history not found") 
        if(medicalHistory.status) return this.medicalHistoryPort.archive(medicalHistory.historyId);
        throw new Error("medical history already archived")
    }
}