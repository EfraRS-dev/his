import { Triage } from '../../domain/triage.entity';
import type { ITriageRepository } from '../../domain/triage.repository';
import { Inject, Injectable } from '@nestjs/common';
import { TRIAGE_REPOSITORY_TOKEN } from '../tokens';

@Injectable()
export class GetTriageByPatientUseCase {
  constructor(
    @Inject(TRIAGE_REPOSITORY_TOKEN)
    private readonly triageRepository: ITriageRepository,
  ) {}

  async execute(patientId: number): Promise<Triage | null> {
    return this.triageRepository.findByPatientId(patientId);
  }
}
