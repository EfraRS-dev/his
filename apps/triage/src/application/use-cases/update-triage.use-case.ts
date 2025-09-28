import { Injectable } from '@nestjs/common';
import type { ITriageRepository } from '../../domain/triage.repository';
import type { IVitalSignsRepository } from '../../domain/vital-signs.repository';
import type { VitalSigns } from '../../domain/vital-signs.entity';
import { UpdateTriageRequestDto } from '../dto/update-triage-request.dto';
import { UpdateTriageResponseDto } from '../dto/update-triage-response.dto';

@Injectable()
export class UpdateTriageUseCase {
  constructor(
    private readonly triageRepository: ITriageRepository,
    private readonly vitalSignsRepository: IVitalSignsRepository,
  ) {}

  async execute(
    triageId: number,
    dto: UpdateTriageRequestDto,
  ): Promise<UpdateTriageResponseDto> {
    // Get existing triage
    const existingTriage = await this.triageRepository.findById(triageId);
    if (!existingTriage) {
      throw new Error('Triage not found');
    }

    const updatedFields: string[] = [];
    let updatedTriage = existingTriage;

    // Update urgency level if provided
    if (dto.urgencyLevel && dto.urgencyLevel !== existingTriage.urgencyLevel) {
      updatedTriage = updatedTriage.updateUrgencyLevel(dto.urgencyLevel);
      updatedFields.push('urgencyLevel');
    }

    // Add additional observations if provided
    if (dto.additionalObservations) {
      updatedTriage = updatedTriage.addObservations(dto.additionalObservations);
      updatedFields.push('observations');
    }

    // Update triage if any fields changed
    if (updatedFields.length > 0) {
      await this.triageRepository.update(triageId, {
        urgencyLevel: updatedTriage.urgencyLevel,
        initialObservations: updatedTriage.initialObservations,
      });
    }

    // Update vital signs if provided
    let updatedVitalSigns: VitalSigns | null = null;
    if (dto.vitalSigns) {
      const existingVitalSigns =
        await this.vitalSignsRepository.findByTriageId(triageId);

      if (existingVitalSigns) {
        await this.vitalSignsRepository.update(
          existingVitalSigns.vitalSignsId,
          {
            temperature:
              dto.vitalSigns.temperature ?? existingVitalSigns.temperature,
            bloodPressure:
              dto.vitalSigns.bloodPressure ?? existingVitalSigns.bloodPressure,
            heartRate: dto.vitalSigns.heartRate ?? existingVitalSigns.heartRate,
            respiratoryRate:
              dto.vitalSigns.respiratoryRate ??
              existingVitalSigns.respiratoryRate,
            oxygenSaturation:
              dto.vitalSigns.oxygenSaturation ??
              existingVitalSigns.oxygenSaturation,
            additionalNotes:
              dto.vitalSigns.additionalNotes ??
              existingVitalSigns.additionalNotes,
          },
        );

        updatedVitalSigns =
          await this.vitalSignsRepository.findByTriageId(triageId);
        updatedFields.push('vitalSigns');
      }
    }

    // Return response
    return {
      triage: {
        triageId: updatedTriage.triageId,
        patientId: updatedTriage.patientId,
        isActive: updatedTriage.isActive,
        createdAt: updatedTriage.createdAt,
        urgencyLevel: updatedTriage.urgencyLevel,
        initialObservations: updatedTriage.initialObservations,
        nurseId: updatedTriage.nurseId,
      },
      vitalSigns: updatedVitalSigns
        ? {
            vitalSignsId: updatedVitalSigns.vitalSignsId,
            triageId: updatedVitalSigns.triageId,
            temperature: updatedVitalSigns.temperature,
            bloodPressure: updatedVitalSigns.bloodPressure,
            heartRate: updatedVitalSigns.heartRate,
            respiratoryRate: updatedVitalSigns.respiratoryRate,
            oxygenSaturation: updatedVitalSigns.oxygenSaturation,
            additionalNotes: updatedVitalSigns.additionalNotes,
          }
        : undefined,
      updatedFields,
      updatedAt: new Date(),
      updatedBy: dto.updatedBy,
      reason: dto.reason,
    };
  }
}
