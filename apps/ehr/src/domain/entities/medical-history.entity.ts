export class MedicalHistory {
  constructor(
    public readonly historyId: string,
    public readonly patientId: string,
    public readonly openedAt: Date,
    public readonly status: 'active' | 'closed',
  ) {}

  static create(historyId: string, patientId: string): MedicalHistory {
    return new MedicalHistory(historyId, patientId, new Date(), 'active');
  }

  close(): MedicalHistory {
    return new MedicalHistory(
      this.historyId,
      this.patientId,
      this.openedAt,
      'closed',
    );
  }

  reopen(): MedicalHistory {
    return new MedicalHistory(
      this.historyId,
      this.patientId,
      this.openedAt,
      'active',
    );
  }
}
