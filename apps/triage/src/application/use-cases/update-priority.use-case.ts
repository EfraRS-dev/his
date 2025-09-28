import { Injectable } from '@nestjs/common';
import type { ITriageRepository } from '../../domain/triage.repository';
import { UpdatePriorityDto } from '../dto/update-priority.dto';
import { TriageDto } from '../dto/triage.dto';

@Injectable()
export class UpdatePriorityUseCase {
  constructor(private readonly triageRepository: ITriageRepository) {}

  async execute(triageId: number, dto: UpdatePriorityDto): Promise<TriageDto> {
    // Get existing triage
    const existingTriage = await this.triageRepository.findById(triageId);
    if (!existingTriage) {
      throw new Error('Triage not found');
    }

    // Update urgency level using domain method
    const updatedTriage = existingTriage.updateUrgencyLevel(dto.urgencyLevel);

    // Save to repository
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
