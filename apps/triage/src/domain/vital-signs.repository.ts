import { VitalSigns } from './vital-signs.entity';

export interface IVitalSignsRepository {
  create(vitalSigns: VitalSigns): Promise<VitalSigns>;
  findById(id: string): Promise<VitalSigns | null>;
  findByTriageId(triageId: string): Promise<VitalSigns | null>;
  update(
    id: string,
    vitalSigns: Partial<VitalSigns>,
  ): Promise<VitalSigns | null>;
  delete(id: string): Promise<boolean>;
}
