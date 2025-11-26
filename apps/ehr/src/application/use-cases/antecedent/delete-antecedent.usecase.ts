import { AntecedentRepositoryPort } from 'apps/ehr/src/domain/repositories/antecedent.repository.port';
import { MedicalHistoryRepositoryPort } from 'apps/ehr/src/domain/repositories/medical-history.repository.port';
import { IEventPublisher } from '../../ports/event-publisher.port';
import { AntecedentDeletedEvent } from 'apps/ehr/src/domain/events';

export class DeleteAntecedentUseCase {
  constructor(
    private readonly antecedentPort: AntecedentRepositoryPort,
    private readonly medicalHistoryPort: MedicalHistoryRepositoryPort,
    private readonly eventPublisher: IEventPublisher,
  ) {}

  async execute(antecedentId: number, userId?: number): Promise<void> {
    const antecedent = await this.antecedentPort.findById(antecedentId);
    if (!antecedent) throw new Error('antecedent Nod found');
    const history = await this.medicalHistoryPort.findByHistoryId(
      antecedent.historyId,
    );
    if (!history) throw new Error("Medical history doesn't exist");
    if (!history.status)
      throw new Error('History is archived, cannot modifiying it');

    await this.antecedentPort.delete(antecedentId);

    // Publish event
    const event = new AntecedentDeletedEvent(
      antecedentId,
      antecedent.historyId,
      {
        timestamp: new Date(),
        userId,
        source: 'ehr-service',
      },
    );
    this.eventPublisher.publishEvent(event.toJSON());
  }
}
