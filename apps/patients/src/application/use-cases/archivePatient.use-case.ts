import { Inject, Injectable } from '@nestjs/common';
import { Patient } from '../../domain/patient';
import type { PatientRepository } from '../../domain/patient.repository.port';
import { PATIENT_REPOSITORY, EVENT_PUBLISHER } from '../token';
import type { IEventPublisher } from '../ports/event-publisher.port';
import { PatientArchivedEvent } from '../../domain/events';

@Injectable()
export class ArchivePatientUseCase {
  constructor(
    @Inject(PATIENT_REPOSITORY) private readonly patientRepo: PatientRepository,
    @Inject(EVENT_PUBLISHER) private readonly eventPublisher: IEventPublisher,
  ) {}

  async execute(Id: number, userId?: number): Promise<Patient> {
    const patient = await this.patientRepo.findPatientById(Id);

    if (patient === null) {
      throw new Error('Patient not found');
    }

    const archivedPatient = new Patient(
      patient.patientId,
      patient.userId,
      patient.documentType,
      patient.documentNumber,
      patient.firstName,
      patient.lastName,
      patient.birthDate,
      patient.gender,
      patient.address,
      patient.phone,
      patient.email,
      patient.emergencyContact,
      patient.createdAt,
      'archived',
    );

    console.log(archivedPatient);

    const savedPatient = await this.patientRepo.update(archivedPatient);

    // Publish event
    const event = new PatientArchivedEvent(
      savedPatient.patientId!,
      new Date(),
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
