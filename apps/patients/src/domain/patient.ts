export class Patient {
  constructor(
    public readonly patientId: number,
    public readonly userId: number,
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
    public readonly registeredAt: Date,
    public readonly status: 'active' | 'archived',
  ) {}
}
