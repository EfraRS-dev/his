import { Triage } from '../../domain/triage.entity';
import { VitalSigns } from '../../domain/vital-signs.entity';
import { Injectable } from '@nestjs/common';
import type { ITriageRepository } from '../../domain/triage.repository';
import type { IVitalSignsRepository } from '../../domain/vital-signs.repository';

export interface QueryTriageByPatientCommand {
  patientId: string;
  includeHistory?: boolean;
}

export interface TriageWithVitals {
  triage: Triage;
  vitalSigns: VitalSigns | null;
  estimatedWaitTime: string;
  actualWaitTime?: string;
}

export interface QueryTriageByPatientResult {
  patientId: string;
  activeTriage?: TriageWithVitals;
  triageHistory: TriageWithVitals[];
  totalTriageVisits: number;
  success: boolean;
  message: string;
}

@Injectable()
export class QueryTriageByPatientUseCase {
  constructor(
    private readonly triageRepository: ITriageRepository,
    private readonly vitalSignsRepository: IVitalSignsRepository,
  ) {}

  async execute(
    command: QueryTriageByPatientCommand,
  ): Promise<QueryTriageByPatientResult> {
    try {
      // Buscar triage activo
      const activeTriage = await this.triageRepository.findActiveByPatientId(
        command.patientId,
      );

      let activeTriageWithVitals: TriageWithVitals | undefined;
      if (activeTriage) {
        const vitalSigns = await this.vitalSignsRepository.findByTriageId(
          activeTriage.triageId,
        );
        activeTriageWithVitals = {
          triage: activeTriage,
          vitalSigns,
          estimatedWaitTime: this.calculateEstimatedWaitTime(
            activeTriage.urgencyLevel,
          ),
          actualWaitTime: this.calculateActualWaitTime(
            activeTriage.createdAt,
            new Date(),
          ),
        };
      }

      // Buscar historial de triage si se solicita
      let triageHistory: TriageWithVitals[] = [];
      if (command.includeHistory) {
        // Aquí deberías implementar un método en el repositorio para obtener el historial
        // Por ahora, devolvemos un array vacío
        triageHistory = [];
      }

      return {
        patientId: command.patientId,
        activeTriage: activeTriageWithVitals,
        triageHistory,
        totalTriageVisits:
          triageHistory.length + (activeTriageWithVitals ? 1 : 0),
        success: true,
        message: activeTriageWithVitals
          ? 'Triage activo encontrado'
          : 'No se encontró triage activo para este paciente',
      };
    } catch (error) {
      throw new Error(
        `Error al consultar triage por paciente: ${error.message}`,
      );
    }
  }

  private calculateEstimatedWaitTime(urgencyLevel: 1 | 2 | 3 | 4 | 5): string {
    const waitTimes = {
      1: 'Inmediato',
      2: '15-30 minutos',
      3: '30-60 minutos',
      4: '1-2 horas',
      5: '2+ horas',
    };
    return waitTimes[urgencyLevel];
  }

  private calculateActualWaitTime(createdAt: Date, currentTime: Date): string {
    const diffMs = currentTime.getTime() - createdAt.getTime();
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
