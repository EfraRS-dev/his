import { Inject, Injectable } from '@nestjs/common';
import type { ITriageRepository } from '../../domain/triage.repository';
import type { IVitalSignsRepository } from '../../domain/vital-signs.repository';
import {
  TRIAGE_REPOSITORY_TOKEN,
  VITAL_SIGNS_REPOSITORY_TOKEN,
  EVENT_PUBLISHER,
} from '../tokens';
import type { IEventPublisher } from '../ports/event-publisher.port';
import { TriageDeletedEvent } from '../../domain/events';

export interface DeleteTriageCommand {
  triageId: number;
  userId: number;
  reason?: string;
}

export interface DeleteTriageResult {
  success: boolean;
  message: string;
  deletedTriageId?: number;
  deletedAt?: Date;
}

@Injectable()
export class DeleteTriageUseCase {
  constructor(
    @Inject(TRIAGE_REPOSITORY_TOKEN)
    private readonly triageRepository: ITriageRepository,
    @Inject(VITAL_SIGNS_REPOSITORY_TOKEN)
    private readonly vitalSignsRepository: IVitalSignsRepository,
    @Inject(EVENT_PUBLISHER)
    private readonly eventPublisher: IEventPublisher,
  ) {}

  async execute(command: DeleteTriageCommand): Promise<DeleteTriageResult> {
    try {
      const { triageId } = command;

      const triage = await this.triageRepository.findById(triageId);
      if (!triage) {
        return {
          success: false,
          message: 'Triage not found',
        };
      }

      const deleted = await this.triageRepository.delete(triageId);

      if (!deleted) {
        return {
          success: false,
          message: 'Could not delete triage',
        };
      }

      // Publish triage deleted event
      this.eventPublisher.publishEvent(
        new TriageDeletedEvent(triageId, triage.patientId, new Date()).toJSON(),
      );

      return {
        success: true,
        message: 'Triage deleted successfully',
        deletedTriageId: triageId,
        deletedAt: new Date(),
      };
    } catch (error) {
      throw new Error(`Error deleting triage: ${(error as Error).message}`);
    }
  }
}
