import { MedicalHistory } from 'apps/ehr/src/domain/entities/medical-history.entity';
import { MedicalHistoryRepositoryPort } from 'apps/ehr/src/domain/repositories/medical-history.repository.port';
import type { IEventPublisher } from '../../ports/event-publisher.port';
import { MedicalHistoryCreatedEvent } from 'apps/ehr/src/domain/events';

export class CreateMedicalHistoryUseCase {
  constructor(
    private readonly medicalHistoryPort: MedicalHistoryRepositoryPort,
    private readonly eventPublisher: IEventPublisher,
  ) {}

  async execute(patientId: number, userId?: number): Promise<MedicalHistory> {
    const validation = await this.medicalHistoryPort.findByPatientId(patientId);
    if (validation) throw new Error('the medical history already exists');
    const date = new Date();
    const medicalHistory = new MedicalHistory(patientId, date, true);
    const savedHistory = await this.medicalHistoryPort.save(medicalHistory);

    // Publish event
    const event = new MedicalHistoryCreatedEvent(
      savedHistory.historyId!,
      savedHistory.patientId,
      savedHistory.openedAt,
      savedHistory.status,
      {
        timestamp: new Date(),
        userId,
        source: 'ehr-service',
      },
    );
    this.eventPublisher.publishEvent(event.toJSON());
    return savedHistory;
  }
}
