import { Injectable } from '@nestjs/common';
import { Triage } from '../../domain/triage.entity';
import { VitalSigns } from '../../domain/vital-signs.entity';
import type { ITriageRepository } from '../../domain/triage.repository';
import type { IVitalSignsRepository } from '../../domain/vital-signs.repository';

export interface RegisterTriageCommand {
  patientId: string;
  nurseId: string;
  urgencyLevel: 1 | 2 | 3 | 4 | 5;
  initialObservations: string;
  vitalSigns: {
    temperature: number;
    bloodPressure: string;
    heartRate: number;
    respiratoryRate: number;
    oxygenSaturation: number;
    additionalNotes?: string;
  };
}

export interface RegisterTriageResult {
  triageId: string;
  patientId: string;
  urgencyLevel: 1 | 2 | 3 | 4 | 5;
  urgencyDescription: string;
  createdAt: Date;
  nurseId: string;
  vitalSignsId: string;
  estimatedWaitTime: string;
  success: boolean;
  message: string;
}

@Injectable()
export class RegisterTriageUseCase {
  constructor(
    private readonly triageRepository: ITriageRepository,
    private readonly vitalSignsRepository: IVitalSignsRepository,
  ) {}

  async execute(command: RegisterTriageCommand): Promise<RegisterTriageResult> {
    try {
      // Verificar si el paciente ya tiene un triage activo
      const existingTriage = await this.triageRepository.findActiveByPatientId(
        command.patientId,
      );
      if (existingTriage) {
        throw new Error(
          'El paciente ya tiene un triage activo. Actualice el existente en su lugar.',
        );
      }

      // Generar IDs únicos
      const triageId = this.generateTriageId();
      const vitalSignsId = this.generateVitalSignsId();

      // Crear entidad de triage
      const triage = Triage.create(
        triageId,
        command.patientId,
        command.urgencyLevel,
        command.initialObservations,
        command.nurseId,
      );

      // Crear entidad de signos vitales
      const vitalSigns = VitalSigns.create(
        vitalSignsId,
        triageId,
        command.vitalSigns.temperature,
        command.vitalSigns.bloodPressure,
        command.vitalSigns.heartRate,
        command.vitalSigns.respiratoryRate,
        command.vitalSigns.oxygenSaturation,
        command.vitalSigns.additionalNotes,
      );

      // Guardar en repositorios
      const savedTriage = await this.triageRepository.create(triage);
      await this.vitalSignsRepository.create(vitalSigns);

      // Calcular tiempo estimado de espera
      const estimatedWaitTime = this.calculateEstimatedWaitTime(
        command.urgencyLevel,
      );

      return {
        triageId: savedTriage.triageId,
        patientId: savedTriage.patientId,
        urgencyLevel: savedTriage.urgencyLevel,
        urgencyDescription: savedTriage.getUrgencyDescription(),
        createdAt: savedTriage.createdAt,
        nurseId: savedTriage.nurseId,
        vitalSignsId,
        estimatedWaitTime,
        success: true,
        message: 'Triage registrado exitosamente',
      };
    } catch (error) {
      throw new Error(`Error al registrar triage: ${error.message}`);
    }
  }

  private generateTriageId(): string {
    return `triage-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateVitalSignsId(): string {
    return `vitals-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
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
}
