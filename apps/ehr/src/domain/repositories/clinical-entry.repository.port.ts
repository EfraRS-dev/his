import { ClinicalEntry } from "../entities/clinical-entry.entity";

export interface ClinicalEntryRepositoryPort {
    save(entry: ClinicalEntry): Promise<ClinicalEntry>;
    findById(enrtyId: number): Promise<ClinicalEntry | null>;
    //findByHistoryId(historyId: number): Promise<ClinicalEntry[]>;
    update(clinicalentre: ClinicalEntry): Promise<ClinicalEntry>;
}