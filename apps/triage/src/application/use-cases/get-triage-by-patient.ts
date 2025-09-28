import { Triage } from '../../domain/triage.entity';
import type { ITriageRepository } from '../../domain/triage.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetTriageByPatientUseCase {
  constructor(private readonly triageRepository: ITriageRepository) {}

  async execute(patientId: string): Promise<Triage | null> {
    return this.triageRepository.findByPatientId(patientId);
  }
}
