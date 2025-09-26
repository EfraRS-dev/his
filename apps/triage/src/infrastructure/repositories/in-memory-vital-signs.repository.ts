import { Injectable } from '@nestjs/common';
import { IVitalSignsRepository } from '../../domain/vital-signs.repository';
import { VitalSigns } from '../../domain/vital-signs.entity';

@Injectable()
export class InMemoryVitalSignsRepository implements IVitalSignsRepository {
  private vitalSigns: Map<string, VitalSigns> = new Map();

  async create(vitalSigns: VitalSigns): Promise<VitalSigns> {
    this.vitalSigns.set(vitalSigns.vitalSignsId, vitalSigns);
    return vitalSigns;
  }

  async findById(id: string): Promise<VitalSigns | null> {
    return this.vitalSigns.get(id) || null;
  }

  async findByTriageId(triageId: string): Promise<VitalSigns | null> {
    const signs = Array.from(this.vitalSigns.values());
    return signs.find((vital) => vital.triageId === triageId) || null;
  }

  async update(
    id: string,
    updates: Partial<VitalSigns>,
  ): Promise<VitalSigns | null> {
    const existingVitalSigns = this.vitalSigns.get(id);
    if (!existingVitalSigns) {
      return null;
    }

    // Crear nuevos signos vitales con las actualizaciones
    const updatedVitalSigns = new VitalSigns(
      existingVitalSigns.vitalSignsId,
      existingVitalSigns.triageId,
      updates.temperature ?? existingVitalSigns.temperature,
      updates.bloodPressure ?? existingVitalSigns.bloodPressure,
      updates.heartRate ?? existingVitalSigns.heartRate,
      updates.respiratoryRate ?? existingVitalSigns.respiratoryRate,
      updates.oxygenSaturation ?? existingVitalSigns.oxygenSaturation,
      updates.additionalNotes ?? existingVitalSigns.additionalNotes,
    );

    this.vitalSigns.set(id, updatedVitalSigns);
    return updatedVitalSigns;
  }

  async delete(id: string): Promise<boolean> {
    return this.vitalSigns.delete(id);
  }
}