import { AntecedentRepositoryPort } from 'apps/ehr/src/domain/repositories/antecedent.repository.port';
import { CreateAntecedentDto } from '../../dto/repos_dto/create-antecedent.dto';
import { Antecedent } from 'apps/ehr/src/domain/entities/antecedent.entity';
import { MedicalHistoryRepositoryPort } from 'apps/ehr/src/domain/repositories/medical-history.repository.port';
import { IEventPublisher } from '../../ports/event-publisher.port';
import { AntecedentCreatedEvent } from 'apps/ehr/src/domain/events';

export class CreateAntecedentUseCase {
  constructor(
    private readonly antecedentPort: AntecedentRepositoryPort,
    private readonly medicalHistoryPort: MedicalHistoryRepositoryPort,
    private readonly eventPublisher: IEventPublisher,
  ) {}

  async execute(
    input: CreateAntecedentDto,
    userId?: number,
  ): Promise<Antecedent> {
    const history = await this.medicalHistoryPort.findByHistoryId(
      input.historyId,
    );
    if (!history)
      throw new Error('history not found, impossible add an antecedent');
    if (!history.status)
      throw new Error('History is archived, cannot add antecedents');
    const antecedent = new Antecedent(
      input.type,
      input.description,
      input.historyId,
    );
    const savedAntecedent = await this.antecedentPort.save(antecedent);

    // Publish event
    const event = new AntecedentCreatedEvent(
      savedAntecedent.antecedentId!,
      savedAntecedent.historyId,
      savedAntecedent.type,
      savedAntecedent.description,
      {
        timestamp: new Date(),
        userId,
        source: 'ehr-service',
      },
    );
    this.eventPublisher.publishEvent(event.toJSON());

    return savedAntecedent;
  }
}
