import { MedicalHistory } from "apps/ehr/src/domain/entities/medical-history.entity";
import { medicalHistoryRepositoryPort } from "apps/ehr/src/domain/repositories/medical-history.repository.port";

export class CreateMedicalHistoryUseCase {
    constructor(private readonly medicalHistoryPort: medicalHistoryRepositoryPort){}

    async execute(patientId: number): Promise<MedicalHistory>{
        const validation = await this.medicalHistoryPort.findByPatientId(patientId);
        if(validation) throw new Error("the medical history already exists")
        const date = new Date()
        const medicalHistory = new MedicalHistory(patientId, date, true)
        return this.medicalHistoryPort.save(medicalHistory)
    }
}