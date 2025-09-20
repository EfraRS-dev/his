export interface RegisterPatientCommand {
  usuarioId: string; // Reference to user in Users microservice
  documentType: string; // e.g., 'CC', 'TI', 'CE', 'Passport'
  documentNumber: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
  phone: string;
  email: string;
  emergencyContact: string; // Emergency contact phone
}

export interface RegisterPatientResult {
  patientId: string;
  fullName: string;
  documentType: string;
  documentNumber: string;
  age: number;
  phone: string;
  email: string;
  registeredAt: Date;
  status: 'active' | 'archived';
}

export class RegisterPatientUseCase {
  constructor(
    private readonly patientRepository: any, // Replace with proper interface
  ) {}

  async execute(command: RegisterPatientCommand): Promise<RegisterPatientResult> {
    // Check if patient already exists with same document
    const existingPatient = await this.patientRepository.findByDocument(
      command.documentType,
      command.documentNumber,
    );
    
    if (existingPatient) {
      throw new Error(`Patient with document ${command.documentType} ${command.documentNumber} already exists`);
    }

    // Generate patient ID
    const patientId = this.generatePatientId();

    // Create patient domain entity
    const patient = {
      patientId,
      usuarioId: command.usuarioId,
      documentType: command.documentType,
      documentNumber: command.documentNumber,
      firstName: command.firstName,
      lastName: command.lastName,
      birthDate: command.birthDate,
      gender: command.gender,
      address: command.address,
      phone: command.phone,
      email: command.email,
      emergencyContact: command.emergencyContact,
      registeredAt: new Date(),
      status: 'active' as const,
    };

    // Save patient
    await this.patientRepository.save(patient);

    // Calculate age
    const age = this.calculateAge(command.birthDate);

    return {
      patientId: patient.patientId,
      fullName: `${patient.firstName} ${patient.lastName}`,
      documentType: patient.documentType,
      documentNumber: patient.documentNumber,
      age,
      phone: patient.phone,
      email: patient.email,
      registeredAt: patient.registeredAt,
      status: patient.status,
    };
  }

  private generatePatientId(): string {
    // Simple ID generation - replace with proper UUID library
    return 'patient-' + Math.random().toString(36).substr(2, 9);
  }

  private calculateAge(birthDate: Date): number {
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }
    
    return age;
  }
}