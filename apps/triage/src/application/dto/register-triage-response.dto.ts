import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TriageDto } from './triage.dto';
import { VitalSignsDto } from './vital-signs.dto';

export class RegisterTriageResponseDto {
  @ApiProperty({
    description: 'The created triage record',
    type: () => TriageDto,
  })
  @Type(() => TriageDto)
  triage: TriageDto;

  @ApiProperty({
    description: 'The vital signs recorded during triage',
    type: () => VitalSignsDto,
  })
  @Type(() => VitalSignsDto)
  vitalSigns: VitalSignsDto;
}
