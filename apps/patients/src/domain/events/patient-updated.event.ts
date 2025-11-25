export class PatientUpdatedEvent {
  constructor(
    public readonly patientId: number,
    public readonly address?: string,
    public readonly phone?: string,
    public readonly email?: string,
    public readonly emergencyContact?: string,
    public readonly metadata?: {
      timestamp?: Date;
      userId?: number;
      source?: string;
    },
  ) {}

  toJSON() {
    return {
      eventType: 'patient.updated',
      patientId: this.patientId,
      address: this.address,
      phone: this.phone,
      email: this.email,
      emergencyContact: this.emergencyContact,
      metadata: {
        timestamp: this.metadata?.timestamp || new Date(),
        userId: this.metadata?.userId,
        source: this.metadata?.source || 'patients-service',
      },
    };
  }
}
