import { MedicalHistory } from 'apps/ehr/src/domain/entities/medical-history.entity';
import { MedicalHistoryRepositoryPort } from 'apps/ehr/src/domain/repositories/medical-history.repository.port';
import { IEventPublisher } from '../../ports/event-publisher.port';
import { MedicalHistoryArchivedEvent } from 'apps/ehr/src/domain/events';

export class ArchiveMedicalHistoryUseCase {
  constructor(
    private readonly medicalHistoryPort: MedicalHistoryRepositoryPort,
    private readonly eventPublisher: IEventPublisher,
  ) {}

  async execute(patientId: number, userId?: number): Promise<MedicalHistory> {
    const medicalHistory =
      await this.medicalHistoryPort.findByPatientId(patientId);
    if (!medicalHistory) throw new Error('medical history not found');
    if (!medicalHistory.historyId) throw new Error('medical history not found');
    if (!medicalHistory.status)
      throw new Error('medical history already archived');

    const archivedHistory = await this.medicalHistoryPort.archive(
      medicalHistory.historyId,
    );

    // Publish event
    const event = new MedicalHistoryArchivedEvent(
      archivedHistory.historyId!,
      archivedHistory.patientId,
      new Date(),
      {
        timestamp: new Date(),
        userId,
        source: 'ehr-service',
      },
    );
    this.eventPublisher.publishEvent(event.toJSON());

    return archivedHistory;
  }
}
