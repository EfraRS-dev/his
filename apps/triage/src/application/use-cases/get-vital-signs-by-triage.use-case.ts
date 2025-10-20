import { Inject, Injectable } from '@nestjs/common';
import { VitalSigns } from '../../domain/vital-signs.entity';
import type { IVitalSignsRepository } from '../../domain/vital-signs.repository';
import { VITAL_SIGNS_REPOSITORY_TOKEN } from '../tokens';

export interface GetVitalSignsByTriageCommand {
  triageId: number;
}

export interface GetVitalSignsByTriageResult {
  success: boolean;
  message: string;
  vitalSigns?: VitalSigns;
  found: boolean;
}

@Injectable()
export class GetVitalSignsByTriageUseCase {
  constructor(
    @Inject(VITAL_SIGNS_REPOSITORY_TOKEN)
    private readonly vitalSignsRepository: IVitalSignsRepository,
  ) {}

  async execute(
    command: GetVitalSignsByTriageCommand,
  ): Promise<GetVitalSignsByTriageResult> {
    try {
      const { triageId } = command;

      const vitalSigns =
        await this.vitalSignsRepository.findByTriageId(triageId);

      if (!vitalSigns) {
        return {
          success: true,
          message: 'No se encontraron signos vitales para este triage',
          found: false,
        };
      }

      return {
        success: true,
        message: 'Signos vitales obtenidos exitosamente',
        vitalSigns,
        found: true,
      };
    } catch (error) {
      throw new Error(
        `Error al obtener signos vitales por triage: ${(error as Error).message}`,
      );
    }
  }
}
