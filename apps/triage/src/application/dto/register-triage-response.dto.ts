import { Type } from 'class-transformer';
import { TriageDto } from './triage.dto';
import { VitalSignsDto } from './vital-signs.dto';

export class RegisterTriageResponseDto {
  @Type(() => TriageDto)
  triage: TriageDto;

  @Type(() => VitalSignsDto)
  vitalSigns: VitalSignsDto;
}
