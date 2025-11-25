import { ClinicalEntry} from "../entities/clinical-entry.entity";
import { MedicalHistory } from "../entities/medical-history.entity";

export interface ClinicalEntryRepositoryPort {
    save(entry: ClinicalEntry): Promise<ClinicalEntry>;
    findById(enrtyId: number): Promise<ClinicalEntry | null>;
    //findByHistoryId(historyId: number): Promise<ClinicalEntry[]>;
    update(clinicalentre: ClinicalEntry): Promise<ClinicalEntry>;
    AiDiagnosis(information: string): Promise<string>;
    filterInfoToAi(entry: string, history: MedicalHistory): Promise<string>;
}