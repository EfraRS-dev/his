import { Inject, Injectable } from '@nestjs/common';
import { Triage } from '../../domain/triage.entity';
import { VitalSigns } from '../../domain/vital-signs.entity';
import type { ITriageRepository } from '../../domain/triage.repository';
import type { IVitalSignsRepository } from '../../domain/vital-signs.repository';
import { RegisterTriageDto } from '../dto/register-triage.dto';
import { RegisterTriageResponseDto } from '../dto/register-triage-response.dto';
import {
  TRIAGE_REPOSITORY_TOKEN,
  VITAL_SIGNS_REPOSITORY_TOKEN,
} from '../tokens';

@Injectable()
export class RegisterTriageUseCase {
  constructor(
    @Inject(TRIAGE_REPOSITORY_TOKEN)
    private readonly triageRepository: ITriageRepository,
    @Inject(VITAL_SIGNS_REPOSITORY_TOKEN)
    private readonly vitalSignsRepository: IVitalSignsRepository,
  ) {}

  async execute(dto: RegisterTriageDto): Promise<RegisterTriageResponseDto> {
    const existingTriage = await this.triageRepository.findActiveByPatientId(
      dto.patientId,
    );

    if (existingTriage) {
      throw new Error('Patient already has an active triage');
    }

    const triage = Triage.create(
      0, // Id temporal
      dto.patientId,
      dto.urgencyLevel,
      dto.initialObservations || '',
      dto.nurseId,
    );

    const savedTriage = await this.triageRepository.create(triage);

    const vitalSigns = VitalSigns.create(
      0, // Id temporal
      savedTriage.triageId,
      dto.vitalSigns.temperature,
      dto.vitalSigns.bloodPressure,
      dto.vitalSigns.heartRate,
      dto.vitalSigns.respiratoryRate,
      dto.vitalSigns.oxygenSaturation,
      dto.vitalSigns.additionalNotes,
    );

    const savedVitalSigns = await this.vitalSignsRepository.create(vitalSigns);

    return {
      triage: {
        triageId: savedTriage.triageId,
        patientId: savedTriage.patientId,
        isActive: savedTriage.isActive,
        createdAt: savedTriage.createdAt,
        urgencyLevel: savedTriage.urgencyLevel,
        initialObservations: savedTriage.initialObservations,
        nurseId: savedTriage.nurseId,
      },
      vitalSigns: {
        vitalSignsId: savedVitalSigns.vitalSignsId,
        triageId: savedVitalSigns.triageId,
        temperature: savedVitalSigns.temperature,
        bloodPressure: savedVitalSigns.bloodPressure,
        heartRate: savedVitalSigns.heartRate,
        respiratoryRate: savedVitalSigns.respiratoryRate,
        oxygenSaturation: savedVitalSigns.oxygenSaturation,
        additionalNotes: savedVitalSigns.additionalNotes,
      },
    };
  }
}
