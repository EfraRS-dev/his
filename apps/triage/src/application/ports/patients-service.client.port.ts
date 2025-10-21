/**
 * Port (Interface) for Patients Service Client
 * Defines contract for communication with Patients microservice
 */
export interface IPatientsServiceClient {
  /**
   * Check if a patient exists by ID
   * @param patientId - Patient identifier
   * @returns Promise<boolean> - true if patient exists, false otherwise
   */
  patientExists(patientId: number): Promise<boolean>;

  /**
   * Get patient details by ID
   * @param patientId - Patient identifier
   * @returns Promise<PatientDto | null> - Patient data or null if not found
   */
  getPatientById(patientId: number): Promise<PatientDto | null>;
}

/**
 * Patient DTO returned from Patients Service
 */
export interface PatientDto {
  patientId: number;
  userId: number | null;
  documentType: string;
  documentNumber: string;
  firstName: string;
  lastName: string;
  birthDate: Date | string;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
  phone: string;
  email: string;
  emergencyContact: string;
  createdAt: Date | string;
  status: 'active' | 'archived';
}
