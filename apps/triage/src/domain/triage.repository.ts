import { Triage } from './triage.entity';

export interface ITriageRepository {
  create(triage: Triage): Promise<Triage>;
  findById(id: string): Promise<Triage | null>;
  findByPatientId(patientId: string): Promise<Triage | null>;
  findActiveByPatientId(patientId: string): Promise<Triage | null>;
  findAll(): Promise<Triage[]>;
  findByUrgencyLevel(urgencyLevel: 1 | 2 | 3 | 4 | 5): Promise<Triage[]>;
  findAllSortedByPriority(): Promise<Triage[]>;
  update(id: string, triage: Partial<Triage>): Promise<Triage | null>;
  delete(id: string): Promise<boolean>;
}
