export class MedicalHistoryCreatedEvent {
  constructor(
    public readonly historyId: number,
    public readonly patientId: number,
    public readonly openedAt: Date,
    public readonly status: boolean,
    public readonly metadata?: {
      timestamp?: Date;
      userId?: number;
      source?: string;
    },
  ) {}

  toJSON() {
    return {
      eventType: 'medical-history.created',
      historyId: this.historyId,
      patientId: this.patientId,
      openedAt: this.openedAt,
      status: this.status,
      metadata: {
        timestamp: this.metadata?.timestamp || new Date(),
        userId: this.metadata?.userId,
        source: this.metadata?.source || 'ehr-service',
      },
    };
  }
}
