import { Injectable } from '@nestjs/common';
import { IVitalSignsRepository } from '../../domain/vital-signs.repository';
import { VitalSigns } from '../../domain/vital-signs.entity';

@Injectable()
export class InMemoryVitalSignsRepository implements IVitalSignsRepository {
  private vitalSigns: Map<number, VitalSigns> = new Map();

  create(vitalSigns: VitalSigns): Promise<VitalSigns> {
    this.vitalSigns.set(vitalSigns.vitalSignsId, vitalSigns);
    return Promise.resolve(vitalSigns);
  }

  findById(id: number): Promise<VitalSigns | null> {
    return Promise.resolve(this.vitalSigns.get(id) || null);
  }

  findByTriageId(triageId: number): Promise<VitalSigns | null> {
    const signs = Array.from(this.vitalSigns.values());
    return Promise.resolve(
      signs.find((vital) => vital.triageId === triageId) || null,
    );
  }

  update(id: number, updates: Partial<VitalSigns>): Promise<VitalSigns | null> {
    const existingVitalSigns = this.vitalSigns.get(id);
    if (!existingVitalSigns) {
      return Promise.resolve(null);
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
    return Promise.resolve(updatedVitalSigns);
  }

  delete(id: number): Promise<boolean> {
    return Promise.resolve(this.vitalSigns.delete(id));
  }
}
