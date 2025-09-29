import { Inject, Injectable } from '@nestjs/common';
import type { ITriageRepository } from '../../domain/triage.repository';
import type { IVitalSignsRepository } from '../../domain/vital-signs.repository';
import {
  TRIAGE_REPOSITORY_TOKEN,
  VITAL_SIGNS_REPOSITORY_TOKEN,
} from '../tokens';

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
  ) {}

  async execute(command: DeleteTriageCommand): Promise<DeleteTriageResult> {
    try {
      const { triageId } = command;

      const triage = await this.triageRepository.findById(triageId);
      if (!triage) {
        return {
          success: false,
          message: 'Triage no encontrado',
        };
      }

      const deleted = await this.triageRepository.delete(triageId);

      if (!deleted) {
        return {
          success: false,
          message: 'No se pudo eliminar el triage',
        };
      }

      return {
        success: true,
        message: 'Triage eliminado exitosamente',
        deletedTriageId: triageId,
        deletedAt: new Date(),
      };
    } catch (error) {
      throw new Error(`Error al eliminar triage: ${(error as Error).message}`);
    }
  }
}
