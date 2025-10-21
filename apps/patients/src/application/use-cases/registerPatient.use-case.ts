import { Patient } from "../../domain/patient";
import type { PatientRepository } from "../../domain/patient.repository.port";
import { PatientRegisterDto } from '../dto/registerPatient.dto';
import { Injectable, Inject } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class PatientRegisterUseCase {
    constructor(
        private readonly patientRepo: PatientRepository,
        private readonly http: HttpService
    ) {}

    async execute(patientInput: PatientRegisterDto): Promise<Patient> {
        const existingPatient = await this.patientRepo.findPatientByDocument(patientInput.documentType, patientInput.documentNumber);
        if (existingPatient !== null) {
            throw new Error(`Patient with document already exists`);
        }
        const patient = new Patient(
            null,
            patientInput.userId ?? null,
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

        const savedPatient = await this.patientRepo.save(patient);
        await this.http.axiosRef.post(`http://ehr:3000/ehr/${savedPatient.patientId}`);
        return savedPatient;
    }
}