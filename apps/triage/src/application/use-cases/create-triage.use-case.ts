import { Triage } from '../../domain/triage.entity';
import type { ITriageRepository } from '../../domain/triage.repository';
import { CreateTriageDto } from '../dto/create-triage.dto';
import { Inject, Injectable } from '@nestjs/common';
import {
  TRIAGE_REPOSITORY_TOKEN,
  PATIENTS_SERVICE_CLIENT_TOKEN,
  USERS_SERVICE_CLIENT_TOKEN,
} from '../tokens';
import type { IPatientsServiceClient } from '../ports/patients-service.client.port';
import type { IUsersServiceClient } from '../ports/users-service.client.port';
import { UserRoles } from '../constants/user-roles';

@Injectable()
export class CreateTriageUseCase {
  constructor(
    @Inject(TRIAGE_REPOSITORY_TOKEN)
    private readonly triageRepository: ITriageRepository,
    @Inject(PATIENTS_SERVICE_CLIENT_TOKEN)
    private readonly patientsClient: IPatientsServiceClient,
    @Inject(USERS_SERVICE_CLIENT_TOKEN)
    private readonly usersClient: IUsersServiceClient,
  ) {}

  async execute(data: CreateTriageDto): Promise<Triage> {
    // Validate patient exists
    const patientExists = await this.patientsClient.patientExists(
      data.patientId,
    );
    if (!patientExists) {
      throw new Error(`Patient with ID ${data.patientId} not found`);
    }

    // Validate nurse exists
    const nurse = await this.usersClient.getUserById(data.nurseId);
    if (!nurse) {
      throw new Error(`Nurse with ID ${data.nurseId} not found`);
    }

    // Validate nurse has NURSE role
    const hasNurseRole = await this.usersClient.userHasRole(
      data.nurseId,
      UserRoles.NURSE,
    );
    if (!hasNurseRole) {
      throw new Error(
        `User ${data.nurseId} does not have NURSE role (current roleId: ${nurse.roleId})`,
      );
    }

    // Validate nurse is active
    const isActive = await this.usersClient.isUserActive(data.nurseId);
    if (!isActive) {
      throw new Error(
        `Nurse ${data.nurseId} is not active (status: ${nurse.status})`,
      );
    }

    const triage = Triage.create(
      0, // Id temporal
      data.patientId,
      data.urgencyLevel,
      data.initialObservations || '',
      data.nurseId,
    );

    return await this.triageRepository.create(triage);
  }
}
