import { Injectable } from '@nestjs/common';
import { VitalSigns } from '../../domain/vital-signs.entity';
import type { IVitalSignsRepository } from '../../domain/vital-signs.repository';
import type { ITriageRepository } from '../../domain/triage.repository';
import { CreateVitalSignsDto } from '../dto/create-vital-signs.dto';
import { VitalSignsDto } from '../dto/vital-signs.dto';

@Injectable()
export class RegisterVitalSignsUseCase {
  constructor(
    private readonly vitalSignsRepository: IVitalSignsRepository,
    private readonly triageRepository: ITriageRepository,
  ) {}

  async execute(
    triageId: number,
    dto: CreateVitalSignsDto,
  ): Promise<VitalSignsDto> {
    // Verify triage exists
    const triage = await this.triageRepository.findById(triageId);
    if (!triage) {
      throw new Error('Triage not found');
    }

    const vitalSigns = VitalSigns.create(
      0, // Id temporal
      triageId,
      dto.temperature,
      dto.bloodPressure,
      dto.heartRate,
      dto.respiratoryRate,
      dto.oxygenSaturation,
      dto.additionalNotes,
    );

    const savedVitalSigns = await this.vitalSignsRepository.create(vitalSigns);

    return {
      vitalSignsId: savedVitalSigns.vitalSignsId,
      triageId: savedVitalSigns.triageId,
      temperature: savedVitalSigns.temperature,
      bloodPressure: savedVitalSigns.bloodPressure,
      heartRate: savedVitalSigns.heartRate,
      respiratoryRate: savedVitalSigns.respiratoryRate,
      oxygenSaturation: savedVitalSigns.oxygenSaturation,
      additionalNotes: savedVitalSigns.additionalNotes,
    };
  }
}
