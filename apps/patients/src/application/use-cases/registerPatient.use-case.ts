import { Patient } from "../../domain/patient";
import type { PatientRepository } from "../../domain/patient.repository";
import { PatientRegisterDto } from '../dto/registerPatient.dto';
import { Injectable, Inject } from "@nestjs/common";
import { PATIENT_REPOSITORY } from "../token";

@Injectable()
export class PatientRegisterUseCase {
    constructor(
        @Inject(PATIENT_REPOSITORY) private readonly patientRepo: PatientRepository
    ) {}

    async execute(patientInput: PatientRegisterDto): Promise<Patient> {
        const existingPatient = await this.patientRepo.findPatientByDocument(patientInput.documentType, patientInput.documentNumber);
        if (existingPatient !== null) {
            throw new Error(`Patient with document already exists`);
        }
        const patientId = await this.patientRepo.generatePatientId();
        const patient = new Patient(
            patientId,
            patientInput.userId,
            patientInput.documentType,
            patientInput.documentNumber,
            patientInput.firstName,
            patientInput.lastName,
            patientInput.birthDate,
            patientInput.gender,
            patientInput.address,
            patientInput.phone,
            patientInput.email,
            patientInput.emergencyContact,
            new Date(),
            'active'
        )
        return this.patientRepo.save(patient);
    }
}