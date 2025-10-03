import { MedicalHistory } from "../entities/medical-history.entity";

export interface MedicalHistoryRepositoryPort {
    save(medicalHistory: MedicalHistory): Promise<MedicalHistory>;
    findByPatientId(patientId: number): Promise<MedicalHistory | null>;
    findByHistoryId(historyId: number): Promise<MedicalHistory | null>;
    archive(historyId: number): Promise<MedicalHistory>;
    unarchive(historyId: number): Promise<MedicalHistory>;
    GetMedicalHistoryComplete(patientId: number): Promise<MedicalHistory | null>;
}