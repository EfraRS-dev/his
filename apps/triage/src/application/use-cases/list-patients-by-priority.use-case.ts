import { Triage } from '../../domain/triage.entity';
import { VitalSigns } from '../../domain/vital-signs.entity';
import { Inject, Injectable } from '@nestjs/common';
import type { ITriageRepository } from '../../domain/triage.repository';
import type { IVitalSignsRepository } from '../../domain/vital-signs.repository';
import {
  TRIAGE_REPOSITORY_TOKEN,
  VITAL_SIGNS_REPOSITORY_TOKEN,
} from '../tokens';

export interface ListPatientsByPriorityCommand {
  urgencyLevel?: 1 | 2 | 3 | 4 | 5;
  includeAllLevels?: boolean;
  limit?: number;
  offset?: number;
}

export interface PatientTriageInfo {
  patientId: number;
  triageId: number;
  urgencyLevel: 1 | 2 | 3 | 4 | 5;
  urgencyDescription: string;
  createdAt: Date;
  waitTime: string;
  nurseId: number;
  initialObservations: string;
  vitalSigns: VitalSigns | null;
}

export interface ListPatientsByPriorityResult {
  patients: PatientTriageInfo[];
  totalCount: number;
  urgencyLevelCounts: {
    level1: number;
    level2: number;
    level3: number;
    level4: number;
    level5: number;
  };
  success: boolean;
  message: string;
}

@Injectable()
export class ListPatientsByPriorityUseCase {
  constructor(
    @Inject(TRIAGE_REPOSITORY_TOKEN)
    private readonly triageRepository: ITriageRepository,
    @Inject(VITAL_SIGNS_REPOSITORY_TOKEN)
    private readonly vitalSignsRepository: IVitalSignsRepository,
  ) {}

  async execute(
    command: ListPatientsByPriorityCommand,
  ): Promise<ListPatientsByPriorityResult> {
    try {
      let triages: Triage[] = [];

      if (command.urgencyLevel && !command.includeAllLevels) {
        // Filtrar por nivel de urgencia específico
        triages = await this.triageRepository.findByUrgencyLevel(
          command.urgencyLevel,
        );
      } else {
        // Obtener todos los triages ordenados por prioridad
        triages = await this.triageRepository.findAllSortedByPriority();
      }

      // Aplicar paginación si se especifica
      if (command.limit || command.offset) {
        const offset = command.offset || 0;
        const limit = command.limit || 50;
        triages = triages.slice(offset, offset + limit);
      }

      // Mapear a información de pacientes con signos vitales
      const patients: PatientTriageInfo[] = [];
      for (const triage of triages) {
        const vitalSigns = await this.vitalSignsRepository.findByTriageId(
          triage.triageId,
        );

        const patientInfo: PatientTriageInfo = {
          patientId: triage.patientId,
          triageId: triage.triageId,
          urgencyLevel: triage.urgencyLevel,
          urgencyDescription: triage.getUrgencyDescription(),
          createdAt: triage.createdAt,
          waitTime: this.calculateWaitTime(triage.createdAt),
          nurseId: triage.nurseId,
          initialObservations: triage.initialObservations,
          vitalSigns,
        };

        patients.push(patientInfo);
      }

      const urgencyLevelCounts = this.calculateUrgencyLevelCounts(triages);

      return {
        patients,
        totalCount: triages.length,
        urgencyLevelCounts,
        success: true,
        message: `Se encontraron ${patients.length} pacientes en la cola de triage`,
      };
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : 'Error desconocido';
      throw new Error(`Error al listar pacientes por prioridad: ${message}`);
    }
  }

  private calculateUrgencyLevelCounts(triages: Triage[]): {
    level1: number;
    level2: number;
    level3: number;
    level4: number;
    level5: number;
  } {
    const counts = { level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 };

    triages.forEach((triage) => {
      switch (triage.urgencyLevel) {
        case 1:
          counts.level1++;
          break;
        case 2:
          counts.level2++;
          break;
        case 3:
          counts.level3++;
          break;
        case 4:
          counts.level4++;
          break;
        case 5:
          counts.level5++;
          break;
      }
    });

    return counts;
  }

  private calculateWaitTime(createdAt: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - createdAt.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 60) {
      return `${diffMins} minutos`;
    } else {
      const hours = Math.floor(diffMins / 60);
      const minutes = diffMins % 60;
      return `${hours}h ${minutes}m`;
    }
  }
}
