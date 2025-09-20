export interface QueryPatientCommand {
  searchTerm: string; // Can be document, name, or ID
  searchType?: 'document' | 'name' | 'id' | 'email';
}

export interface PatientResult {
  patientId: string;
  fullName: string;
  documentType: string;
  documentNumber: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  address: string;
  emergencyContact: string;
  registeredAt: Date;
  status: 'active' | 'archived';
}

export class QueryPatientUseCase {
  constructor(
    private readonly patientRepository: any, // Replace with proper interface
  ) {}

  async execute(command: QueryPatientCommand): Promise<PatientResult[]> {
    let patients: any[];
    
    switch (command.searchType) {
      case 'id': {
        const patientById = await this.patientRepository.findById(command.searchTerm);
        patients = patientById ? [patientById] : [];
        break;
      }
      case 'email': {
        const patientByEmail = await this.patientRepository.findByEmail(command.searchTerm);
        patients = patientByEmail ? [patientByEmail] : [];
        break;
      }
      case 'name': {
        patients = await this.patientRepository.findByName(command.searchTerm);
        break;
      }
      case 'document': {
        // Try to parse document type and number from search term
        const documentParts = command.searchTerm.split(' ');
        if (documentParts.length >= 2) {
          const [docType, docNumber] = documentParts;
          const patient = await this.patientRepository.findByDocument(docType, docNumber);
          patients = patient ? [patient] : [];
        } else {
          // Search by document number only
          patients = await this.patientRepository.findByDocumentNumber(command.searchTerm);
        }
        break;
      }
      default: {
        // Auto-detect search type and search across all fields
        patients = await this.searchAcrossFields(command.searchTerm);
        break;
      }
    }
    
    // Transform to result format
    return patients.map((patient) => ({
      patientId: patient.patientId,
      fullName: `${patient.firstName} ${patient.lastName}`,
      documentType: patient.documentType,
      documentNumber: patient.documentNumber,
      age: this.calculateAge(patient.birthDate),
      gender: patient.gender,
      phone: patient.phone,
      email: patient.email,
      address: patient.address,
      emergencyContact: patient.emergencyContact,
      registeredAt: patient.registeredAt,
      status: patient.status,
    }));
  }
  
  private async searchAcrossFields(searchTerm: string): Promise<any[]> {
    // Try different search strategies
    const searches = await Promise.allSettled([
      this.patientRepository.findById(searchTerm),
      this.patientRepository.findByEmail(searchTerm),
      this.patientRepository.findByName(searchTerm),
      this.patientRepository.findByDocumentNumber(searchTerm),
    ]);
    
    const results: any[] = [];
    searches.forEach((result) => {
      if (result.status === 'fulfilled' && result.value) {
        if (Array.isArray(result.value)) {
          results.push(...result.value);
        } else {
          results.push(result.value);
        }
      }
    });
    
    // Remove duplicates based on patientId
    const unique = results.filter((patient, index, self) => 
      index === self.findIndex((p) => p.patientId === patient.patientId)
    );
    
    return unique;
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