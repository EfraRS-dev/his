import { Injectable } from '@nestjs/common';
import type { ITriageRepository } from '../../domain/triage.repository';
import { Triage } from '../../domain/triage.entity';

@Injectable()
export class GetAllTriagesUseCase {
  constructor(private readonly triageRepository: ITriageRepository) {}

  /**
   * Get all triages in the system
   * @returns Array of all triages
   */
  async execute(): Promise<Triage[]> {
    return await this.triageRepository.findAll();
  }
}
