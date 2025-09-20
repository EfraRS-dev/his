export interface DocumentMetadata {
  date: Date;
  format: string;
  size: number;
}

export class ClinicalDocument {
  constructor(
    public readonly documentId: string,
    public readonly entryId: string,
    public readonly type: 'lab' | 'imaging' | 'external report',
    public readonly fileUrl: string,
    public readonly storagePath: string,
    public readonly metadata: DocumentMetadata,
  ) {}

  static create(
    documentId: string,
    entryId: string,
    type: 'lab' | 'imaging' | 'external report',
    fileUrl: string,
    storagePath: string,
    format: string,
    size: number,
  ): ClinicalDocument {
    const metadata: DocumentMetadata = {
      date: new Date(),
      format,
      size,
    };

    return new ClinicalDocument(
      documentId,
      entryId,
      type,
      fileUrl,
      storagePath,
      metadata,
    );
  }

  updatePath(fileUrl: string, storagePath: string): ClinicalDocument {
    return new ClinicalDocument(
      this.documentId,
      this.entryId,
      this.type,
      fileUrl,
      storagePath,
      this.metadata,
    );
  }
}
