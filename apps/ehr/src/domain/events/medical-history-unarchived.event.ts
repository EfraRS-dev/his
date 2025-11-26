export class MedicalHistoryUnarchivedEvent {
  constructor(
    public readonly historyId: number,
    public readonly patientId: number,
    public readonly unarchivedAt: Date,
    public readonly metadata?: {
      timestamp?: Date;
      userId?: number;
      source?: string;
    },
  ) {}

  toJSON() {
    return {
      eventType: 'medical-history.unarchived',
      historyId: this.historyId,
      patientId: this.patientId,
      unarchivedAt: this.unarchivedAt,
      metadata: {
        timestamp: this.metadata?.timestamp || new Date(),
        userId: this.metadata?.userId,
        source: this.metadata?.source || 'ehr-service',
      },
    };
  }
}
