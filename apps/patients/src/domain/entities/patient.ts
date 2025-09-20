export class Patient {
  constructor(
    public readonly patientId: string,
    public readonly usuarioId: string,
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

  static create(
    patientId: string,
    usuarioId: string,
    documentType: string,
    documentNumber: string,
    firstName: string,
    lastName: string,
    birthDate: Date,
    gender: 'Male' | 'Female' | 'Other',
    address: string,
    phone: string,
    email: string,
    emergencyContact: string,
  ): Patient {
    return new Patient(
      patientId,
      usuarioId,
      documentType,
      documentNumber,
      firstName,
      lastName,
      birthDate,
      gender,
      address,
      phone,
      email,
      emergencyContact,
      new Date(),
      'active',
    );
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getAge(): number {
    const today = new Date();
    const age = today.getFullYear() - this.birthDate.getFullYear();
    const monthDiff = today.getMonth() - this.birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < this.birthDate.getDate())
    ) {
      return age - 1;
    }

    return age;
  }

  archive(): Patient {
    return new Patient(
      this.patientId,
      this.usuarioId,
      this.documentType,
      this.documentNumber,
      this.firstName,
      this.lastName,
      this.birthDate,
      this.gender,
      this.address,
      this.phone,
      this.email,
      this.emergencyContact,
      this.registeredAt,
      'archived',
    );
  }

  updateContactInfo(
    phone: string,
    email: string,
    address: string,
    emergencyContact: string,
  ): Patient {
    return new Patient(
      this.patientId,
      this.usuarioId,
      this.documentType,
      this.documentNumber,
      this.firstName,
      this.lastName,
      this.birthDate,
      this.gender,
      address,
      phone,
      email,
      emergencyContact,
      this.registeredAt,
      this.status,
    );
  }
}
