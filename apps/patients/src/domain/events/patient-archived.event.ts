export class PatientArchivedEvent {
  constructor(
    public readonly patientId: number,
    public readonly archivedAt: Date,
    public readonly metadata?: {
      timestamp?: Date;
      userId?: number;
      source?: string;
    },
  ) {}

  toJSON() {
    return {
      eventType: 'patient.archived',
      patientId: this.patientId,
      archivedAt: this.archivedAt,
      metadata: {
        timestamp: this.metadata?.timestamp || new Date(),
        userId: this.metadata?.userId,
        source: this.metadata?.source || 'patients-service',
      },
    };
  }
}
