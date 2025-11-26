import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { ITriageRepository } from '../../domain/triage.repository';
import { Triage } from '../../domain/triage.entity';

@Injectable()
export class PrismaTriageRepository implements ITriageRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toDomain(record: {
    id: number;
    patientId: number;
    isActive: boolean;
    createdAt: Date;
    urgencyLevel: number;
    initialObservations: string;
    nurseId: number;
  }): Triage {
    return new Triage(
      record.id,
      record.patientId,
      record.isActive,
      record.createdAt,
      record.urgencyLevel as 1 | 2 | 3 | 4 | 5,
      record.initialObservations,
      record.nurseId,
    );
  }

  async create(triage: Triage): Promise<Triage> {
    const created = await this.prisma.triage.create({
      data: {
        patientId: triage.patientId,
        isActive: triage.isActive,
        urgencyLevel: triage.urgencyLevel,
        initialObservations: triage.initialObservations,
        nurseId: triage.nurseId,
      },
    });
    return this.toDomain(created);
  }

  async findById(id: number): Promise<Triage | null> {
    const found = await this.prisma.triage.findUnique({ where: { id } });
    return found ? this.toDomain(found) : null;
  }

  async findByPatientId(patientId: number): Promise<Triage | null> {
    const found = await this.prisma.triage.findFirst({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
    });
    return found ? this.toDomain(found) : null;
  }

  async findActiveByPatientId(patientId: number): Promise<Triage | null> {
    const found = await this.prisma.triage.findFirst({
      where: { patientId, isActive: true },
      orderBy: { createdAt: 'desc' },
    });
    return found ? this.toDomain(found) : null;
  }

  async findAll(): Promise<Triage[]> {
    const rows = await this.prisma.triage.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async findByUrgencyLevel(urgencyLevel: 1 | 2 | 3 | 4 | 5): Promise<Triage[]> {
    const rows = await this.prisma.triage.findMany({ where: { urgencyLevel } });
    return rows.map((r) => this.toDomain(r));
  }

  async findAllSortedByPriority(): Promise<Triage[]> {
    const rows = await this.prisma.triage.findMany({
      orderBy: [{ urgencyLevel: 'asc' }, { createdAt: 'asc' }],
    });
    return rows.map((r) => this.toDomain(r));
  }

  async update(id: number, updates: Partial<Triage>): Promise<Triage | null> {
    try {
      const updated = await this.prisma.triage.update({
        where: { id },
        data: {
          urgencyLevel: updates.urgencyLevel,
          initialObservations: updates.initialObservations,
          isActive: updates.isActive,
          nurseId: updates.nurseId,
        },
      });
      return this.toDomain(updated);
    } catch {
      return null;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.prisma.triage.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
