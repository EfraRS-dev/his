export class TriageUpdatedEvent {
  constructor(
    public readonly triageId: number,
    public readonly patientId: number,
    public readonly changes: Record<string, any>,
    public readonly timestamp: Date = new Date(),
  ) {}

  toJSON() {
    return {
      triageId: this.triageId,
      patientId: this.patientId,
      changes: this.changes,
      timestamp: this.timestamp.toISOString(),
    };
  }
}
