import { Injectable } from '@nestjs/common';
import { ITriageRepository } from '../../domain/triage.repository';
import { Triage } from '../../domain/triage.entity';

@Injectable()
export class InMemoryTriageRepository implements ITriageRepository {
  private triages: Map<string, Triage> = new Map();

  async create(triage: Triage): Promise<Triage> {
    this.triages.set(triage.triageId, triage);
    return new Promise((resolve) => resolve(triage));
  }

  async findById(id: string): Promise<Triage | null> {
    return new Promise((resolve) => resolve(this.triages.get(id) || null));
  }

  async findByPatientId(patientId: string): Promise<Triage | null> {
    const triages = Array.from(this.triages.values());
    return new Promise((resolve) =>
      resolve(triages.find((triage) => triage.patientId === patientId) || null),
    );
  }

  async findActiveByPatientId(patientId: string): Promise<Triage | null> {
    const triages = Array.from(this.triages.values());
    return new Promise((resolve) =>
      resolve(triages.find((triage) => triage.patientId === patientId) || null),
    );
  }

  async findAll(): Promise<Triage[]> {
    return new Promise((resolve) => resolve(Array.from(this.triages.values())));
  }

  async findByUrgencyLevel(urgencyLevel: 1 | 2 | 3 | 4 | 5): Promise<Triage[]> {
    const triages = Array.from(this.triages.values());
    return new Promise((resolve) =>
      resolve(triages.filter((triage) => triage.urgencyLevel === urgencyLevel)),
    );
  }

  async findAllSortedByPriority(): Promise<Triage[]> {
    const triages = Array.from(this.triages.values());
    return new Promise((resolve) => {
      resolve(
        triages.sort((a, b) => {
          // Ordenar por nivel de urgencia (1 = más urgente, 5 = menos urgente)
          if (a.urgencyLevel !== b.urgencyLevel) {
            return a.urgencyLevel - b.urgencyLevel;
          }
          // En caso de mismo nivel, ordenar por tiempo de llegada
          return a.createdAt.getTime() - b.createdAt.getTime();
        }),
      );
    });
  }

  async update(id: string, updates: Partial<Triage>): Promise<Triage | null> {
    const existingTriage = this.triages.get(id);
    if (!existingTriage) {
      return null;
    }

    // Crear nuevo triage con las actualizaciones
    let updatedTriage = existingTriage;

    if (updates.urgencyLevel !== undefined) {
      updatedTriage = updatedTriage.updateUrgencyLevel(updates.urgencyLevel);
    }

    if (updates.initialObservations !== undefined) {
      updatedTriage = updatedTriage.addObservations(
        updates.initialObservations,
      );
    }

    this.triages.set(id, updatedTriage);
    return new Promise((resolve) => resolve(updatedTriage));
  }

  async delete(id: string): Promise<boolean> {
    return new Promise((resolve) => resolve(this.triages.delete(id)));
  }
}
