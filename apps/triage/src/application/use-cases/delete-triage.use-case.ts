import { Injectable } from '@nestjs/common';
import type { ITriageRepository } from '../../domain/triage.repository';
import type { IVitalSignsRepository } from '../../domain/vital-signs.repository';

@Injectable()
export class DeleteTriageUseCase {
  constructor(
    private readonly triageRepository: ITriageRepository,
    private readonly vitalSignsRepository: IVitalSignsRepository,
  ) {}

  async execute(triageId: number): Promise<boolean> {
    const triage = await this.triageRepository.findById(triageId);
    if (!triage) {
      throw new Error('Triage not found');
    }

    // Delete associated vital signs first (if they exist)
    const vitalSigns = await this.vitalSignsRepository.findByTriageId(triageId);
    if (vitalSigns) {
      await this.vitalSignsRepository.delete(vitalSigns.vitalSignsId);
    }

    const deleted = await this.triageRepository.delete(triageId);

    if (!deleted) {
      throw new Error('Failed to delete triage');
    }

    return deleted;
  }
}
