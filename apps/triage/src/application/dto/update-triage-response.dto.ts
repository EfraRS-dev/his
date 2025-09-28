import { Type } from 'class-transformer';
import { TriageDto } from './triage.dto';
import { VitalSignsDto } from './vital-signs.dto';

export class UpdateTriageResponseDto {
  @Type(() => TriageDto)
  triage: TriageDto;

  @Type(() => VitalSignsDto)
  vitalSigns?: VitalSignsDto;

  updatedFields: string[];

  @Type(() => Date)
  updatedAt: Date;

  updatedBy: number;
  reason: string;
}
