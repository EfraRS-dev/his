import { VitalSigns } from './vital-signs.entity';

export interface IVitalSignsRepository {
  create(vitalSigns: VitalSigns): Promise<VitalSigns>;
  findById(id: number): Promise<VitalSigns | null>;
  findByTriageId(triageId: number): Promise<VitalSigns | null>;
  update(
    id: number,
    vitalSigns: Partial<VitalSigns>,
  ): Promise<VitalSigns | null>;
  delete(id: number): Promise<boolean>;
}
