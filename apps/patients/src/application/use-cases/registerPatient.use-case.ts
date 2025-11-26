import { Patient } from '../../domain/patient';
import type { PatientRepository } from '../../domain/patient.repository.port';
import { PatientRegisterDto } from '../dto/registerPatient.dto';
import { Injectable, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import type { IEventPublisher } from '../ports/event-publisher.port';
import { PatientRegisteredEvent } from '../../domain/events';
import { PATIENT_REPOSITORY, EVENT_PUBLISHER } from '../token';

@Injectable()
export class PatientRegisterUseCase {
  constructor(
    @Inject(PATIENT_REPOSITORY) private readonly patientRepo: PatientRepository,
    private readonly http: HttpService,
    @Inject(EVENT_PUBLISHER) private readonly eventPublisher: IEventPublisher,
  ) {}

  async execute(
    patientInput: PatientRegisterDto,
    userId?: number,
  ): Promise<Patient> {
    const existingPatient = await this.patientRepo.findPatientByDocument(
      patientInput.documentType,
      patientInput.documentNumber,
    );
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
      'active',
    );

    const savedPatient = await this.patientRepo.save(patient);
    await this.http.axiosRef.post(
      `http://ehr:3000/ehr/${savedPatient.patientId}`,
    );

    // Publish event
    const event = new PatientRegisteredEvent(
      savedPatient.patientId!,
      savedPatient.userId,
      savedPatient.documentType,
      savedPatient.documentNumber,
      savedPatient.firstName,
      savedPatient.lastName,
      savedPatient.birthDate,
      savedPatient.gender,
      savedPatient.address,
      savedPatient.phone,
      savedPatient.email,
      savedPatient.emergencyContact,
      savedPatient.createdAt,
      {
        timestamp: new Date(),
        userId,
        source: 'patients-service',
      },
    );
    this.eventPublisher.publishEvent(event.toJSON());

    return savedPatient;
  }
}
