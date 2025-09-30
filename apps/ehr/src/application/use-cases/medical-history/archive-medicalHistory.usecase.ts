import { MedicalHistory } from "apps/ehr/src/domain/entities/medical-history.entity";
import { MedicalHistoryRepositoryPort } from "apps/ehr/src/domain/repositories/medical-history.repository.port";


export class ArchiveMedicalHistoryUeCase {
    constructor(private readonly medicalHistoryPort: MedicalHistoryRepositoryPort){}

    async execute(patientId: number): Promise<MedicalHistory>{
        const medicalHistory = await this.medicalHistoryPort.findByPatientId(patientId);
        if(medicalHistory?.historyId){
            if(medicalHistory.status){
                return this.medicalHistoryPort.archive(medicalHistory.historyId);
            }
            throw new Error("la historia médica ya está archivada")
        }
        throw new Error("La historia medica no existe")
    }
}