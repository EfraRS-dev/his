import { Triage } from '../../domain/triage.entity';
import type { ITriageRepository } from '../../domain/triage.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetActiveTriageUseCase {
  constructor(private readonly triageRepository: ITriageRepository) {}

  async execute(patientId: number): Promise<Triage | null> {
    return this.triageRepository.findActiveByPatientId(patientId);
  }
}
