import { UpdatePatientDto } from '../dto/updatePatient.dto';
import { Patient } from '../../domain/patient';
import type { PatientRepository } from '../../domain/patient.repository.port';
import { Injectable, Inject } from '@nestjs/common';
import { PATIENT_REPOSITORY, EVENT_PUBLISHER } from '../token';
import type { IEventPublisher } from '../ports/event-publisher.port';
import { PatientUpdatedEvent } from '../../domain/events';

@Injectable()
export class UpdatePatientUseCase {
  constructor(
    @Inject(PATIENT_REPOSITORY) private readonly patientRepo: PatientRepository,
    @Inject(EVENT_PUBLISHER) private readonly eventPublisher: IEventPublisher,
  ) {}

  async execute(
    updateInput: UpdatePatientDto,
    userId?: number,
  ): Promise<Patient> {
    const patient = await this.patientRepo.findPatientById(
      updateInput.patientId,
    );

    if (patient === null) {
      throw new Error('Patient not found');
    }

    const updatedPatient = new Patient(
      patient.patientId,
      patient.userId,
      patient.documentType,
      patient.documentNumber,
      patient.firstName,
      patient.lastName,
      patient.birthDate,
      patient.gender,
      updateInput.address ?? patient.address,
      updateInput.phone ?? patient.phone,
      updateInput.email ?? patient.email,
      updateInput.emergencyContact ?? patient.emergencyContact,
      patient.createdAt,
      patient.status,
    );

    const savedPatient = await this.patientRepo.update(updatedPatient);

    // Publish event
    const event = new PatientUpdatedEvent(
      savedPatient.patientId!,
      updateInput.address,
      updateInput.phone,
      updateInput.email,
      updateInput.emergencyContact,
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
