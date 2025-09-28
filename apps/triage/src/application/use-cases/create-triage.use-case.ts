import { Triage } from '../../domain/triage.entity';
import type { ITriageRepository } from '../../domain/triage.repository';
import { CreateTriageDto } from '../dto/create-triage.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateTriageUseCase {
  constructor(private readonly triageRepository: ITriageRepository) {}

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
