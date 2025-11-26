import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import type { PatientRepository } from "../../domain/patient.repository.port";
import { Patient } from "../../domain/patient";
import { Triage } from "../../application/dto/triage.dto";
import { MedicalHistory } from "../../application/dto/medicalHistory.dto";
import e from "express";

@Injectable()
export class PrismaPatientRepository implements PatientRepository {
    constructor(
        private readonly prisma: PrismaService
    ){}

    async save(patient: Patient): Promise<Patient>{
        const saved = await this.prisma.patient.create({
            data: {
                userId: patient.userId,
                documentType: patient.documentType,
                documentNumber: patient.documentNumber,
                firstName: patient.firstName,
                lastName: patient.lastName,
                birthDate: patient.birthDate,
                gender: patient.gender,
                address: patient.address,
                phone: patient.phone,
                email: patient.email,
                emergencyContact: patient.emergencyContact,
                status: patient.status
            }
        });
        return new Patient(
            saved.patientId,
            saved.userId,
            saved.documentType,
            saved.documentNumber,
            saved.firstName,
            saved.lastName,
            saved.birthDate,
            saved.gender,
            saved.address,
            saved.phone,
            saved.email,
            saved.emergencyContact,
            saved.createdAt,
            saved.status
        );
    }

    async findPatientById(patientId: number): Promise<Patient | null> {
        const patient = await this.prisma.patient.findUnique({where: {patientId}})
        return patient
    } 

    async findPatientByDocument(documentType: string, documentNumber: string): Promise<Patient | null> {
        const patient = await this.prisma.patient.findUnique({where: {documentType, documentNumber}})
        return patient
    }

    async findPatientByName(firstName: string, lastName: string): Promise<Patient | null> {
        const patient = await this.prisma.patient.findFirst({where: {firstName, lastName}})
        return patient
    }

    async update(patient: Patient): Promise<Patient> {
        if (patient.patientId === null) {
            throw new Error("Patient ID is required for update");
        }
        const updatedPatient = await this.prisma.patient.update({
            where: {
                patientId: patient.patientId
            },
            data: {
                address: patient.address,
                phone: patient.phone,
                email: patient.email,
                emergencyContact: patient.emergencyContact,
                status: patient.status
            }
        })

        return new Patient(
            updatedPatient.patientId,
            updatedPatient.userId,
            updatedPatient.documentType,
            updatedPatient.documentNumber,
            updatedPatient.firstName,
            updatedPatient.lastName,
            updatedPatient.birthDate,
            updatedPatient.gender,
            updatedPatient.address,
            updatedPatient.phone,
            updatedPatient.email,
            updatedPatient.emergencyContact,
            updatedPatient.createdAt,
            updatedPatient.status
        );
    }

    async getAllPatients(includeArchived: Boolean): Promise<Patient[]> {
        let patients: Patient[] = [];
        if (!includeArchived) {
            patients = await this.prisma.patient.findMany({
                where: {
                    status: { not: 'archived' }
                }
            });
            return patients;
        } else {
            patients = await this.prisma.patient.findMany();
        }
        return patients;
    }
}