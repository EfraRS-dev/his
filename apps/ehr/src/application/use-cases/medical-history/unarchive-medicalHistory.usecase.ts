import { MedicalHistoryRepositoryPort } from "apps/ehr/src/domain/repositories/medical-history.repository.port";

export class UnarchiveMedicalHistoryUseCase {
    constructor(private readonly medicalHistoryPort: MedicalHistoryRepositoryPort){}

    async execute(patientId: number){
        const medicalHistory = await this.medicalHistoryPort.findByPatientId(patientId)
        if(!medicalHistory) throw new Error("medical history not found")
        if(!medicalHistory.historyId) throw new Error("medical history not found")
        if(medicalHistory.status) throw new Error("medical history aren't archived yet")
        return this.medicalHistoryPort.unarchive(medicalHistory.historyId);
        
    }
}