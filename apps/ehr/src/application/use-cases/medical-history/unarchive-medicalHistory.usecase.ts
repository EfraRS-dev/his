import { MedicalHistoryRepositoryPort } from 'apps/ehr/src/domain/repositories/medical-history.repository.port';
import type { IEventPublisher } from '../../ports/event-publisher.port';
import { MedicalHistoryUnarchivedEvent } from 'apps/ehr/src/domain/events';

export class UnarchiveMedicalHistoryUseCase {
  constructor(
    private readonly medicalHistoryPort: MedicalHistoryRepositoryPort,
    private readonly eventPublisher: IEventPublisher,
  ) {}

  async execute(patientId: number, userId?: number) {
    const medicalHistory =
      await this.medicalHistoryPort.findByPatientId(patientId);
    if (!medicalHistory) throw new Error('medical history not found');
    if (!medicalHistory.historyId) throw new Error('medical history not found');
    if (medicalHistory.status)
      throw new Error("medical history aren't archived yet");

    const unarchivedHistory = await this.medicalHistoryPort.unarchive(
      medicalHistory.historyId,
    );

    // Publish event
    const event = new MedicalHistoryUnarchivedEvent(
      unarchivedHistory.historyId!,
      unarchivedHistory.patientId,
      new Date(),
      {
        timestamp: new Date(),
        userId,
        source: 'ehr-service',
      },
    );
    this.eventPublisher.publishEvent(event.toJSON());
    return unarchivedHistory;
  }
}
