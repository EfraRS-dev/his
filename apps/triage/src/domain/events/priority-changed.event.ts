export class PriorityChangedEvent {
  constructor(
    public readonly triageId: number,
    public readonly patientId: number,
    public readonly oldUrgencyLevel: 1 | 2 | 3 | 4 | 5,
    public readonly newUrgencyLevel: 1 | 2 | 3 | 4 | 5,
    public readonly reason: string,
    public readonly timestamp: Date = new Date(),
  ) {}

  toJSON() {
    return {
      triageId: this.triageId,
      patientId: this.patientId,
      oldUrgencyLevel: this.oldUrgencyLevel,
      newUrgencyLevel: this.newUrgencyLevel,
      reason: this.reason,
      timestamp: this.timestamp.toISOString(),
    };
  }
}
