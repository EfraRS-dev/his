export class TriageCreatedEvent {
  constructor(
    public readonly triageId: number,
    public readonly patientId: number,
    public readonly urgencyLevel: 1 | 2 | 3 | 4 | 5,
    public readonly nurseId: number,
    public readonly timestamp: Date = new Date(),
  ) {}

  toJSON() {
    return {
      triageId: this.triageId,
      patientId: this.patientId,
      urgencyLevel: this.urgencyLevel,
      nurseId: this.nurseId,
      timestamp: this.timestamp.toISOString(),
    };
  }
}
