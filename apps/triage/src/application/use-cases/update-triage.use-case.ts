import { Inject, Injectable } from '@nestjs/common';
import type { ITriageRepository } from '../../domain/triage.repository';
import type { IVitalSignsRepository } from '../../domain/vital-signs.repository';
import type { VitalSigns } from '../../domain/vital-signs.entity';
import { UpdateTriageRequestDto } from '../dto/update-triage-request.dto';
import { UpdateTriageResponseDto } from '../dto/update-triage-response.dto';
import {
  TRIAGE_REPOSITORY_TOKEN,
  VITAL_SIGNS_REPOSITORY_TOKEN,
  PATIENTS_SERVICE_CLIENT_TOKEN,
  USERS_SERVICE_CLIENT_TOKEN,
} from '../tokens';
import type { IPatientsServiceClient } from '../ports/patients-service.client.port';
import type { IUsersServiceClient } from '../ports/users-service.client.port';
import { UserRoles } from '../constants/user-roles';

@Injectable()
export class UpdateTriageUseCase {
  constructor(
    @Inject(TRIAGE_REPOSITORY_TOKEN)
    private readonly triageRepository: ITriageRepository,
    @Inject(VITAL_SIGNS_REPOSITORY_TOKEN)
    private readonly vitalSignsRepository: IVitalSignsRepository,
    @Inject(PATIENTS_SERVICE_CLIENT_TOKEN)
    private readonly patientsClient: IPatientsServiceClient,
    @Inject(USERS_SERVICE_CLIENT_TOKEN)
    private readonly usersClient: IUsersServiceClient,
  ) {}

  async execute(
    triageId: number,
    dto: UpdateTriageRequestDto,
  ): Promise<UpdateTriageResponseDto> {
    // Validate user performing the update exists and is active
    const updateUser = await this.usersClient.getUserById(dto.updatedBy);
    if (!updateUser) {
      throw new Error(`User with ID ${dto.updatedBy} not found`);
    }

    // Validate user is active
    const isActive = await this.usersClient.isUserActive(dto.updatedBy);
    if (!isActive) {
      throw new Error(
        `User ${dto.updatedBy} is not active (status: ${updateUser.status}) and cannot perform updates`,
      );
    }

    // Validate user has appropriate role (NURSE or DOCTOR)
    const hasNurseRole = await this.usersClient.userHasRole(
      dto.updatedBy,
      UserRoles.NURSE,
    );
    const hasDoctorRole = await this.usersClient.userHasRole(
      dto.updatedBy,
      UserRoles.DOCTOR,
    );

    if (!hasNurseRole && !hasDoctorRole) {
      throw new Error(
        `User ${dto.updatedBy} does not have NURSE or DOCTOR role (current roleId: ${updateUser.roleId})`,
      );
    }

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
