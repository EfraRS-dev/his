import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { IVitalSignsRepository } from '../../domain/vital-signs.repository';
import { VitalSigns } from '../../domain/vital-signs.entity';

@Injectable()
export class PrismaVitalSignsRepository implements IVitalSignsRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toDomain(record: {
    id: number;
    triageId: number;
    temperature: number;
    bloodPressure: string;
    heartRate: number;
    respiratoryRate: number;
    oxygenSaturation: number;
    additionalNotes?: string | null;
  }): VitalSigns {
    return new VitalSigns(
      record.id,
      record.triageId,
      record.temperature,
      record.bloodPressure,
      record.heartRate,
      record.respiratoryRate,
      record.oxygenSaturation,
      record.additionalNotes ?? undefined,
    );
  }

  async create(vital: VitalSigns): Promise<VitalSigns> {
    const created = await this.prisma.vitalSigns.create({
      data: {
        triageId: vital.triageId,
        temperature: vital.temperature,
        bloodPressure: vital.bloodPressure,
        heartRate: vital.heartRate,
        respiratoryRate: vital.respiratoryRate,
        oxygenSaturation: vital.oxygenSaturation,
      },
    });
    return this.toDomain(created);
  }

  async findById(id: number): Promise<VitalSigns | null> {
    const found = await this.prisma.vitalSigns.findUnique({ where: { id } });
    return found ? this.toDomain(found) : null;
  }

  async findByTriageId(triageId: number): Promise<VitalSigns | null> {
    const found = await this.prisma.vitalSigns.findFirst({
      where: { triageId },
    });
    return found ? this.toDomain(found) : null;
  }

  async update(
    id: number,
    updates: Partial<VitalSigns>,
  ): Promise<VitalSigns | null> {
    try {
      const updated = await this.prisma.vitalSigns.update({
        where: { id },
        data: {
          temperature: updates.temperature,
          bloodPressure: updates.bloodPressure,
          heartRate: updates.heartRate,
          respiratoryRate: updates.respiratoryRate,
          oxygenSaturation: updates.oxygenSaturation,
        },
      });
      return this.toDomain(updated);
    } catch {
      return null;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.prisma.vitalSigns.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
