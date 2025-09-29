import { ClinicalDocumentType } from "apps/ehr/src/domain/entities/clinical-document.entity";

export type DocumentMetadataDto = {
    date: Date;
    format: string;
    size: number;
}

export type ClinicalDocumentDto = {
    documentId: number,
    entryId: number,
    type: ClinicalDocumentType,
    fileUrl: string,
    metadata: DocumentMetadataDto,
}