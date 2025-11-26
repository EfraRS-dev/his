import { Triage } from './triage.entity';

export interface ITriageRepository {
  create(triage: Triage): Promise<Triage>;
  findById(id: number): Promise<Triage | null>;
  findByPatientId(patientId: number): Promise<Triage | null>;
  findActiveByPatientId(patientId: number): Promise<Triage | null>;
  findAll(): Promise<Triage[]>;
  findByUrgencyLevel(urgencyLevel: 1 | 2 | 3 | 4 | 5): Promise<Triage[]>;
  findAllSortedByPriority(): Promise<Triage[]>;
  update(id: number, triage: Partial<Triage>): Promise<Triage | null>;
  delete(id: number): Promise<boolean>;
}
