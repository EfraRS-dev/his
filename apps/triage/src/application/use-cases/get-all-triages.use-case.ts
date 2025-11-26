import { Inject, Injectable } from '@nestjs/common';
import type { ITriageRepository } from '../../domain/triage.repository';
import { Triage } from '../../domain/triage.entity';
import { TRIAGE_REPOSITORY_TOKEN } from '../tokens';

@Injectable()
export class GetAllTriagesUseCase {
  constructor(
    @Inject(TRIAGE_REPOSITORY_TOKEN)
    private readonly triageRepository: ITriageRepository,
  ) {}

  /**
   * Get all triages in the system
   * @returns Array of all triages
   */
  async execute(): Promise<Triage[]> {
    return await this.triageRepository.findAll();
  }
}
