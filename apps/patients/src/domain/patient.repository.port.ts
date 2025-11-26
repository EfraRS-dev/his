import { Patient } from './patient';

export interface PatientRepository {
  save(patient: Patient): Promise<Patient>;
  findPatientByDocument(
    documentType: string,
    documentNumber: string,
  ): Promise<Patient | null>;
  findPatientById(patientId: number): Promise<Patient | null>;
  findPatientByName(
    firstName: string,
    lastName: string,
  ): Promise<Patient | null>;
  update(patient: Patient): Promise<Patient>;
  getAllPatients(includeArchived: boolean): Promise<Patient[]>;
}
