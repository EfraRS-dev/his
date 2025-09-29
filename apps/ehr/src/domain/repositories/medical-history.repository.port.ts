import { MedicalHistory } from "../entities/medical-history.entity";

export interface medicalHistoryRepositoryPort {
    save(medicalHistory: MedicalHistory): Promise<MedicalHistory>;
    findByPatientId(patientId: number): Promise<MedicalHistory | null>;
    archive(historyId: number): Promise<MedicalHistory>;
    GetMedicalHistoryComplete(patientId: number);
}