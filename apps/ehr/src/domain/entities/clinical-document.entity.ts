export interface DocumentMetadata {
  date?: Date;
  format?: string;
  size?: string;
}

export enum ClinicalDocumentType{
  LAB = "lab",
  IMAGING = "imaging",
  EXTERNAL_REPORT = "external report"
}

export class ClinicalDocument {
  constructor(
    public readonly entryId: number,
    public type: ClinicalDocumentType,
    public fileUrl: string,
    public metadata?: DocumentMetadata,
    public readonly documentId?: number,
  ) {}

}
