export class TriageDeletedEvent {
  constructor(
    public readonly triageId: number,
    public readonly patientId: number,
    public readonly timestamp: Date = new Date(),
  ) {}

  toJSON() {
    return {
      triageId: this.triageId,
      patientId: this.patientId,
      timestamp: this.timestamp.toISOString(),
    };
  }
}
