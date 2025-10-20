import { Triage } from '../../domain/triage.entity';
import type { ITriageRepository } from '../../domain/triage.repository';
import { CreateTriageDto } from '../dto/create-triage.dto';
import { Inject, Injectable } from '@nestjs/common';
import { TRIAGE_REPOSITORY_TOKEN } from '../tokens';

@Injectable()
export class CreateTriageUseCase {
  constructor(
    @Inject(TRIAGE_REPOSITORY_TOKEN)
    private readonly triageRepository: ITriageRepository,
  ) {}

  async execute(data: CreateTriageDto): Promise<Triage> {
    const triage = Triage.create(
      0, // Id temporal
      data.patientId,
      data.urgencyLevel,
      data.initialObservations || '',
      data.nurseId,
    );

    return await this.triageRepository.create(triage);
  }
}
