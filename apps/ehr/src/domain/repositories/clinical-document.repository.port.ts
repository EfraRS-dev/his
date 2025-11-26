import { ClinicalDocument } from "../entities/clinical-document.entity";

export interface ClinicalDocumentRepositoryPort {
    save(document: ClinicalDocument): Promise<ClinicalDocument>;
    //findByEntryId(entryId: number): Promise<ClinicalDocument[]>;
    findById(documentId: number): Promise<ClinicalDocument | null>;
    delete(documentId: number): Promise<void>;
    update(document: ClinicalDocument): Promise<ClinicalDocument>;
}