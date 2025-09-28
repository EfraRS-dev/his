import { Type } from 'class-transformer';

export class TriageDto {
  triageId: number;
  patientId: number;
  isActive: boolean;

  @Type(() => Date)
  createdAt: Date;

  urgencyLevel: 1 | 2 | 3 | 4 | 5;
  initialObservations: string;
  nurseId: number;
}
