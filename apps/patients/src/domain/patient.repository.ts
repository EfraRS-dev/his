import { Patient } from './patient';
import { Triage } from '../application/dto/triage.dto';
import { MedicalHistory } from '../application/dto/medicalHistory.dto'; 

export interface PatientRepository{
    save(patient: Patient): Promise<Patient>;
    findPatientByDocument(documentType: string, documentNumber: string): Promise<Patient | null>;
    findPatientById(patientId: number): Promise<Patient | null>;
    findPatientByName(firstName: string, lastName: string): Promise<Patient | null>;
    findAll(): Promise<Patient[]>;
    generatePatientId(): Promise<number>;
    update(patient: Patient): Promise<Patient>;
    getTriages(patientId: number): Promise<Triage[]>;
    getMedicalHistories(patientId: number): Promise<MedicalHistory[]>;
}