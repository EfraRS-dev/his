import { Triage } from '../../domain/triage.entity';
import { ITriageRepository } from '../../domain/triage.repository';
import { randomUUID } from 'crypto';
import { CreateTriageDto } from '../dto/create-triage.dto';

export class CreateTriageUseCase {
  constructor(private readonly triageRepository: ITriageRepository) {}

  async execute(data: CreateTriageDto): Promise<Triage> {
    if (!data.patientId || !data.urgencyLevel) {
      throw new Error('Invalid data: patientId and urgencyLevel are required.');
    }

    const triage = Triage.create(
      randomUUID(),
      data.patientId,
      data.urgencyLevel,
      data.initialObservations || '',
      data.nurseId,
    );

    return await this.triageRepository.create(triage);
  }
}
