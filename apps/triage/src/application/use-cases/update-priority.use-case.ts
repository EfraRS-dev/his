import { Inject, Injectable } from '@nestjs/common';
import type { ITriageRepository } from '../../domain/triage.repository';
import { UpdatePriorityDto } from '../dto/update-priority.dto';
import { TriageDto } from '../dto/triage.dto';
import { TRIAGE_REPOSITORY_TOKEN, EVENT_PUBLISHER } from '../tokens';
import type { IEventPublisher } from '../ports/event-publisher.port';
import { PriorityChangedEvent } from '../../domain/events';

@Injectable()
export class UpdatePriorityUseCase {
  constructor(
    @Inject(TRIAGE_REPOSITORY_TOKEN)
    private readonly triageRepository: ITriageRepository,
    @Inject(EVENT_PUBLISHER)
    private readonly eventPublisher: IEventPublisher,
  ) {}

  async execute(triageId: number, dto: UpdatePriorityDto): Promise<TriageDto> {
    // Get existing triage
    const existingTriage = await this.triageRepository.findById(triageId);
    if (!existingTriage) {
      throw new Error('Triage not found');
    }

    const oldUrgencyLevel = existingTriage.urgencyLevel;
    const updatedTriage = existingTriage.updateUrgencyLevel(dto.urgencyLevel);

    const savedTriage = await this.triageRepository.update(triageId, {
      urgencyLevel: updatedTriage.urgencyLevel,
    });

    if (!savedTriage) {
      throw new Error('Failed to update triage priority');
    }

    // Publish priority changed event
    this.eventPublisher.publishEvent(
      new PriorityChangedEvent(
        triageId,
        existingTriage.patientId,
        oldUrgencyLevel,
        dto.urgencyLevel,
        dto.reason || 'Priority updated',
        {
          timestamp: new Date(),
          source: 'triage-service',
        },
      ).toJSON(),
    );

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
