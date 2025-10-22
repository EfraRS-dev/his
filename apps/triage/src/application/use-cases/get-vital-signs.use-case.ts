import { Inject, Injectable } from '@nestjs/common';
import { VitalSigns } from '../../domain/vital-signs.entity';
import type { IVitalSignsRepository } from '../../domain/vital-signs.repository';
import { VITAL_SIGNS_REPOSITORY_TOKEN } from '../tokens';

export interface GetVitalSignsCommand {
  vitalSignsId: number;
}

export interface GetVitalSignsResult {
  success: boolean;
  message: string;
  vitalSigns?: VitalSigns;
}

@Injectable()
export class GetVitalSignsUseCase {
  constructor(
    @Inject(VITAL_SIGNS_REPOSITORY_TOKEN)
    private readonly vitalSignsRepository: IVitalSignsRepository,
  ) {}

  async execute(command: GetVitalSignsCommand): Promise<GetVitalSignsResult> {
    try {
      const { vitalSignsId } = command;

      const vitalSigns = await this.vitalSignsRepository.findById(vitalSignsId);

      if (!vitalSigns) {
        return {
          success: false,
          message: 'Vital signs not found',
        };
      }

      return {
        success: true,
        message: 'Vital signs retrieved successfully',
        vitalSigns,
      };
    } catch (error) {
      throw new Error(`Error getting vital signs: ${(error as Error).message}`);
    }
  }
}
