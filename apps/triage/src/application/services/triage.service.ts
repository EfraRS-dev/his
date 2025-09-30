import { Injectable } from '@nestjs/common';

import { CreateTriageUseCase } from '../use-cases/create-triage.use-case';
import { RegisterTriageUseCase } from '../use-cases/register-triage.use-case';
import { GetTriageUseCase } from '../use-cases/get-triage.use-case';
import { GetActiveTriageUseCase } from '../use-cases/get-active-triage.use-case';
import { GetTriageByPatientUseCase } from '../use-cases/get-triage-by-patient';
import { ListPatientsByPriorityUseCase } from '../use-cases/list-patients-by-priority.use-case';
import { UpdateTriageUseCase } from '../use-cases/update-triage.use-case';
import { UpdatePriorityUseCase } from '../use-cases/update-priority.use-case';
import { DeleteTriageUseCase } from '../use-cases/delete-triage.use-case';

import { RegisterVitalSignsUseCase } from '../use-cases/register-vital-signs.use-case';
import { GetVitalSignsUseCase } from '../use-cases/get-vital-signs.use-case';
import { GetVitalSignsByTriageUseCase } from '../use-cases/get-vital-signs-by-triage.use-case';

import { CreateTriageDto } from '../dto/create-triage.dto';
import { RegisterTriageDto } from '../dto/register-triage.dto';

@Injectable()
export class TriageService {
  constructor(
    private readonly createTriageUseCase: CreateTriageUseCase,
    private readonly registerTriageUseCase: RegisterTriageUseCase,
    private readonly getTriageUseCase: GetTriageUseCase,
    private readonly getActiveTriageUseCase: GetActiveTriageUseCase,
    private readonly getTriageByPatientUseCase: GetTriageByPatientUseCase,
    private readonly listPatientsByPriorityUseCase: ListPatientsByPriorityUseCase,
    private readonly updateTriageUseCase: UpdateTriageUseCase,
    private readonly updatePriorityUseCase: UpdatePriorityUseCase,
    private readonly deleteTriageUseCase: DeleteTriageUseCase,

    private readonly registerVitalSignsUseCase: RegisterVitalSignsUseCase,
    private readonly getVitalSignsUseCase: GetVitalSignsUseCase,
    private readonly getVitalSignsByTriageUseCase: GetVitalSignsByTriageUseCase,
  ) {}

  /**
   * Crear un nuevo triage básico
   */
  async createTriage(data: CreateTriageDto) {
    return await this.createTriageUseCase.execute(data);
  }

  /**
   * Registrar triage completo con signos vitales
   */
  async registerTriage(data: RegisterTriageDto) {
    return await this.registerTriageUseCase.execute(data);
  }

  /**
   * Obtener triage por ID
   */
  async getTriage(triageId: number) {
    return await this.getTriageUseCase.execute(triageId);
  }

  /**
   * Obtener triage activo de un paciente
   */
  async getActiveTriage(patientId: number) {
    return await this.getActiveTriageUseCase.execute(patientId);
  }

  /**
   * Obtener triage por paciente (incluyendo historial)
   */
  async getTriageByPatient(patientId: number) {
    return await this.getTriageByPatientUseCase.execute(patientId);
  }

  /**
   * Listar pacientes ordenados por prioridad
   */
  async listPatientsByPriority(filters?: {
    urgencyLevel?: 1 | 2 | 3 | 4 | 5;
    includeAllLevels?: boolean;
  }) {
    return await this.listPatientsByPriorityUseCase.execute({
      urgencyLevel: filters?.urgencyLevel,
      includeAllLevels: filters?.includeAllLevels || false,
    });
  }

  /**
   * Actualizar información del triage
   */
  async updateTriage(
    triageId: number,
    updates: {
      urgencyLevel?: 1 | 2 | 3 | 4 | 5;
      initialObservations?: string;
      temperature?: number;
      bloodPressure?: string;
      heartRate?: number;
      respiratoryRate?: number;
      oxygenSaturation?: number;
      additionalNotes?: string;
    },
  ) {
    return await this.updateTriageUseCase.execute(triageId, {
      ...updates,
      reason: 'Actualización desde servicio',
      updatedBy: 1,
    });
  }

  /**
   * Actualizar solo la prioridad del triage
   */
  async updatePriority(
    triageId: number,
    urgencyLevel: 1 | 2 | 3 | 4 | 5,
    reason?: string,
  ) {
    return await this.updatePriorityUseCase.execute(triageId, {
      urgencyLevel,
      reason: reason || 'Actualización de prioridad',
      updatedBy: 1,
    });
  }

  /**
   * Eliminar triage
   */
  async deleteTriage(triageId: number, userId: number, reason?: string) {
    return await this.deleteTriageUseCase.execute({
      triageId,
      userId,
      reason,
    });
  }

  async registerVitalSigns(data: {
    triageId: number;
    temperature: number;
    bloodPressure: string;
    heartRate: number;
    respiratoryRate: number;
    oxygenSaturation: number;
    additionalNotes?: string;
  }) {
    const { triageId, ...vitalSignsData } = data;
    return await this.registerVitalSignsUseCase.execute(
      triageId,
      vitalSignsData,
    );
  }

  /**
   * Obtener signos vitales por ID
   */
  async getVitalSigns(vitalSignsId: number) {
    return await this.getVitalSignsUseCase.execute({ vitalSignsId });
  }

  /**
   * Obtener signos vitales por triage ID
   */
  async getVitalSignsByTriage(triageId: number) {
    return await this.getVitalSignsByTriageUseCase.execute({ triageId });
  }

  async getTriageStats() {
    const allPatients = await this.listPatientsByPriority({
      includeAllLevels: true,
    });

    return {
      totalPatients: allPatients.patients?.length || 0,
      urgencyLevelCounts: allPatients.urgencyLevelCounts || {},
      averageWaitTimes: allPatients.averageWaitTimes || {},
      success: true,
      message: 'Estadísticas obtenidas exitosamente',
    };
  }

  getHealthCheck(): { status: string; service: string; timestamp: Date } {
    return {
      status: 'OK',
      service: 'Servicio funcionando...',
      timestamp: new Date(),
    };
  }
}
