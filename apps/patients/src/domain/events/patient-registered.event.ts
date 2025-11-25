export class PatientRegisteredEvent {
  constructor(
    public readonly patientId: number,
    public readonly userId: number | null,
    public readonly documentType: string,
    public readonly documentNumber: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly birthDate: Date,
    public readonly gender: 'Male' | 'Female' | 'Other',
    public readonly address: string,
    public readonly phone: string,
    public readonly email: string,
    public readonly emergencyContact: string,
    public readonly createdAt: Date,
    public readonly metadata?: {
      timestamp?: Date;
      userId?: number;
      source?: string;
    },
  ) {}

  toJSON() {
    return {
      eventType: 'patient.registered',
      patientId: this.patientId,
      userId: this.userId,
      documentType: this.documentType,
      documentNumber: this.documentNumber,
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      gender: this.gender,
      address: this.address,
      phone: this.phone,
      email: this.email,
      emergencyContact: this.emergencyContact,
      createdAt: this.createdAt,
      metadata: {
        timestamp: this.metadata?.timestamp || new Date(),
        userId: this.metadata?.userId,
        source: this.metadata?.source || 'patients-service',
      },
    };
  }
}
