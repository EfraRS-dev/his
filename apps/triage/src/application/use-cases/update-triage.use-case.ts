import { VitalSigns } from '../../domain/vital-signs.entity';
import { Injectable } from '@nestjs/common';
import type { ITriageRepository } from '../../domain/triage.repository';
import type { IVitalSignsRepository } from '../../domain/vital-signs.repository';

export interface UpdateTriageCommand {
  triageId: string;
  updatedBy: string;
  urgencyLevel?: 1 | 2 | 3 | 4 | 5;
  additionalObservations?: string;
  reason: string;
  vitalSigns?: {
    temperature?: number;
    bloodPressure?: string;
    heartRate?: number;
    respiratoryRate?: number;
    oxygenSaturation?: number;
    additionalNotes?: string;
  };
}

export interface UpdateTriageResult {
  triageId: string;
  patientId: string;
  previousUrgencyLevel: 1 | 2 | 3 | 4 | 5;
  currentUrgencyLevel: 1 | 2 | 3 | 4 | 5;
  updatedFields: string[];
  updatedAt: Date;
  updatedBy: string;
  reason: string;
  estimatedWaitTime: string;
  vitalSignsUpdated: boolean;
  success: boolean;
  message: string;
}

@Injectable()
export class UpdateTriageUseCase {
  constructor(
    private readonly triageRepository: ITriageRepository,
    private readonly vitalSignsRepository: IVitalSignsRepository,
  ) {}

  async execute(command: UpdateTriageCommand): Promise<UpdateTriageResult> {
    try {
      // Buscar el triage existente
      const existingTriage = await this.triageRepository.findById(
        command.triageId,
      );
      if (!existingTriage) {
        throw new Error('Triage no encontrado');
      }

      const previousUrgencyLevel = existingTriage.urgencyLevel;
      const updatedFields: string[] = [];
      let updatedTriage = existingTriage;

      // Actualizar nivel de urgencia si se proporciona
      if (
        command.urgencyLevel &&
        command.urgencyLevel !== existingTriage.urgencyLevel
      ) {
        updatedTriage = updatedTriage.updateUrgencyLevel(command.urgencyLevel);
        updatedFields.push('urgencyLevel');
      }

      // Agregar observaciones adicionales si se proporcionan
      if (command.additionalObservations) {
        updatedTriage = updatedTriage.addObservations(
          command.additionalObservations,
        );
        updatedFields.push('observations');
      }

      // Actualizar el triage en el repositorio
      if (updatedFields.length > 0) {
        await this.triageRepository.update(command.triageId, {
          urgencyLevel: updatedTriage.urgencyLevel,
          initialObservations: updatedTriage.initialObservations,
        });
      }

      // Actualizar signos vitales si se proporcionan
      let vitalSignsUpdated = false;
      if (command.vitalSigns) {
        const existingVitalSigns =
          await this.vitalSignsRepository.findByTriageId(command.triageId);

        if (existingVitalSigns) {
          const updatedVitalSigns = this.updateVitalSigns(
            existingVitalSigns,
            command.vitalSigns,
          );

          await this.vitalSignsRepository.update(
            existingVitalSigns.vitalSignsId,
            {
              temperature: updatedVitalSigns.temperature,
              bloodPressure: updatedVitalSigns.bloodPressure,
              heartRate: updatedVitalSigns.heartRate,
              respiratoryRate: updatedVitalSigns.respiratoryRate,
              oxygenSaturation: updatedVitalSigns.oxygenSaturation,
              additionalNotes: updatedVitalSigns.additionalNotes,
            },
          );

          vitalSignsUpdated = true;
          updatedFields.push('vitalSigns');
        }
      }

      // Calcular nuevo tiempo estimado de espera
      const estimatedWaitTime = this.calculateEstimatedWaitTime(
        updatedTriage.urgencyLevel,
      );

      return {
        triageId: updatedTriage.triageId,
        patientId: updatedTriage.patientId,
        previousUrgencyLevel,
        currentUrgencyLevel: updatedTriage.urgencyLevel,
        updatedFields,
        updatedAt: new Date(),
        updatedBy: command.updatedBy,
        reason: command.reason,
        estimatedWaitTime,
        vitalSignsUpdated,
        success: true,
        message: `Triage actualizado exitosamente. Campos actualizados: ${updatedFields.join(
          ', ',
        )}`,
      };
    } catch (error) {
      throw new Error(`Error al actualizar triage: ${error.message}`);
    }
  }

  private updateVitalSigns(
    existingVitalSigns: VitalSigns,
    newVitalSigns: {
      temperature?: number;
      bloodPressure?: string;
      heartRate?: number;
      respiratoryRate?: number;
      oxygenSaturation?: number;
      additionalNotes?: string;
    },
  ): VitalSigns {
    return VitalSigns.create(
      existingVitalSigns.vitalSignsId,
      existingVitalSigns.triageId,
      newVitalSigns.temperature ?? existingVitalSigns.temperature,
      newVitalSigns.bloodPressure ?? existingVitalSigns.bloodPressure,
      newVitalSigns.heartRate ?? existingVitalSigns.heartRate,
      newVitalSigns.respiratoryRate ?? existingVitalSigns.respiratoryRate,
      newVitalSigns.oxygenSaturation ?? existingVitalSigns.oxygenSaturation,
      newVitalSigns.additionalNotes ?? existingVitalSigns.additionalNotes,
    );
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
