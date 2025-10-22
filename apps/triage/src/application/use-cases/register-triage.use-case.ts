import { Inject, Injectable } from '@nestjs/common';
import { Triage } from '../../domain/triage.entity';
import { VitalSigns } from '../../domain/vital-signs.entity';
import type { ITriageRepository } from '../../domain/triage.repository';
import type { IVitalSignsRepository } from '../../domain/vital-signs.repository';
import type { IPatientsServiceClient } from '../ports/patients-service.client.port';
import type { IUsersServiceClient } from '../ports/users-service.client.port';
import { RegisterTriageDto } from '../dto/register-triage.dto';
import { RegisterTriageResponseDto } from '../dto/register-triage-response.dto';
import { UserRoles } from '../constants/user-roles';
import {
  TRIAGE_REPOSITORY_TOKEN,
  VITAL_SIGNS_REPOSITORY_TOKEN,
  PATIENTS_SERVICE_CLIENT_TOKEN,
  USERS_SERVICE_CLIENT_TOKEN,
} from '../tokens';

@Injectable()
export class RegisterTriageUseCase {
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

  async execute(dto: RegisterTriageDto): Promise<RegisterTriageResponseDto> {
    // 1. Validate that patient exists
    const patientExists = await this.patientsClient.patientExists(
      dto.patientId,
    );
    if (!patientExists) {
      throw new Error(
        `Patient with ID ${dto.patientId} not found in Patients Service`,
      );
    }

    // 2. Validate that nurse exists and has NURSE role
    const nurse = await this.usersClient.getUserById(dto.nurseId);
    if (!nurse) {
      throw new Error(
        `Nurse with ID ${dto.nurseId} not found in Users Service`,
      );
    }

    const isNurse = await this.usersClient.userHasRole(
      dto.nurseId,
      UserRoles.Nurse,
    );
    if (!isNurse) {
      throw new Error(
        `User with ID ${dto.nurseId} does not have NURSE role. Current roleId: ${nurse.roleId}`,
      );
    }

    const isActive = await this.usersClient.isUserActive(dto.nurseId);
    if (!isActive) {
      throw new Error(
        `Nurse with ID ${dto.nurseId} is not active (status: ${nurse.status}) and cannot register triage`,
      );
    }

    // 3. Check for existing active triage
    const existingTriage = await this.triageRepository.findActiveByPatientId(
      dto.patientId,
    );

    if (existingTriage) {
      throw new Error('Patient already has an active triage');
    }

    // 4. Create triage
    const triage = Triage.create(
      0, // Id temporal
      dto.patientId,
      dto.urgencyLevel,
      dto.initialObservations || '',
      dto.nurseId,
    );

    const savedTriage = await this.triageRepository.create(triage);

    // 5. Create vital signs
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
