import { Inject, Injectable } from '@nestjs/common';
import type { ITriageRepository } from '../../domain/triage.repository';
import { UpdatePriorityDto } from '../dto/update-priority.dto';
import { TriageDto } from '../dto/triage.dto';
import { TRIAGE_REPOSITORY_TOKEN } from '../tokens';

@Injectable()
export class UpdatePriorityUseCase {
  constructor(
    @Inject(TRIAGE_REPOSITORY_TOKEN)
    private readonly triageRepository: ITriageRepository,
  ) {}

  async execute(triageId: number, dto: UpdatePriorityDto): Promise<TriageDto> {
    // Get existing triage
    const existingTriage = await this.triageRepository.findById(triageId);
    if (!existingTriage) {
      throw new Error('Triage not found');
    }

    const updatedTriage = existingTriage.updateUrgencyLevel(dto.urgencyLevel);

    const savedTriage = await this.triageRepository.update(triageId, {
      urgencyLevel: updatedTriage.urgencyLevel,
    });

    if (!savedTriage) {
      throw new Error('Failed to update triage priority');
    }

    // Return response
    return {
      triageId: savedTriage.triageId,
      patientId: savedTriage.patientId,
      isActive: savedTriage.isActive,
      createdAt: savedTriage.createdAt,
      urgencyLevel: savedTriage.urgencyLevel,
      initialObservations: savedTriage.initialObservations,
      nurseId: savedTriage.nurseId,
    };
  }
}
