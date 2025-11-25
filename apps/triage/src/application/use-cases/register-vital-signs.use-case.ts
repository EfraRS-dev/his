import { Inject, Injectable } from '@nestjs/common';
import { VitalSigns } from '../../domain/vital-signs.entity';
import type { IVitalSignsRepository } from '../../domain/vital-signs.repository';
import type { ITriageRepository } from '../../domain/triage.repository';
import { CreateVitalSignsDto } from '../dto/create-vital-signs.dto';
import { VitalSignsDto } from '../dto/vital-signs.dto';
import {
  TRIAGE_REPOSITORY_TOKEN,
  VITAL_SIGNS_REPOSITORY_TOKEN,
  EVENT_PUBLISHER,
} from '../tokens';
import type { IEventPublisher } from '../ports/event-publisher.port';
import { VitalSignsRegisteredEvent } from '../../domain/events';

@Injectable()
export class RegisterVitalSignsUseCase {
  constructor(
    @Inject(VITAL_SIGNS_REPOSITORY_TOKEN)
    private readonly vitalSignsRepository: IVitalSignsRepository,
    @Inject(TRIAGE_REPOSITORY_TOKEN)
    private readonly triageRepository: ITriageRepository,
    @Inject(EVENT_PUBLISHER)
    private readonly eventPublisher: IEventPublisher,
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

    // Publish vital signs registered event
    this.eventPublisher.publishEvent(
      new VitalSignsRegisteredEvent(
        savedVitalSigns.vitalSignsId,
        triageId,
        triage.patientId,
        this.detectCriticalValues(savedVitalSigns),
        {
          timestamp: new Date(),
          source: 'triage-service',
        },
      ).toJSON(),
    );

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

  private detectCriticalValues(vitalSigns: VitalSigns) {
    return {
      temperature: vitalSigns.temperature > 38.5 || vitalSigns.temperature < 35,
      heartRate: vitalSigns.heartRate > 100 || vitalSigns.heartRate < 60,
      oxygenSaturation: vitalSigns.oxygenSaturation < 90,
    };
  }
}
