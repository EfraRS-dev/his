export class ClinicalEntry {
  constructor(
    public readonly entryId: string,
    public readonly historyId: string,
    public readonly date: Date,
    public readonly type: 'outpatient' | 'emergency' | 'hospitalization',
    public readonly reasonForVisit: string,
    public readonly diagnosis: string,
    public readonly notes: string,
    public readonly doctorId: string,
  ) {}

  static create(
    entryId: string,
    historyId: string,
    type: 'outpatient' | 'emergency' | 'hospitalization',
    reasonForVisit: string,
    diagnosis: string,
    notes: string,
    doctorId: string,
  ): ClinicalEntry {
    return new ClinicalEntry(
      entryId,
      historyId,
      new Date(),
      type,
      reasonForVisit,
      diagnosis,
      notes,
      doctorId,
    );
  }

  updateDiagnosis(diagnosis: string): ClinicalEntry {
    return new ClinicalEntry(
      this.entryId,
      this.historyId,
      this.date,
      this.type,
      this.reasonForVisit,
      diagnosis,
      this.notes,
      this.doctorId,
    );
  }

  addNotes(additionalNotes: string): ClinicalEntry {
    const updatedNotes = this.notes
      ? `${this.notes}\n${additionalNotes}`
      : additionalNotes;
    return new ClinicalEntry(
      this.entryId,
      this.historyId,
      this.date,
      this.type,
      this.reasonForVisit,
      this.diagnosis,
      updatedNotes,
      this.doctorId,
    );
  }
}
