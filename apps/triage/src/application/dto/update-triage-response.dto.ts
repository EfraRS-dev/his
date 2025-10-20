import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TriageDto } from './triage.dto';
import { VitalSignsDto } from './vital-signs.dto';

export class UpdateTriageResponseDto {
  @ApiProperty({
    description: 'The updated triage record',
    type: () => TriageDto,
  })
  @Type(() => TriageDto)
  triage: TriageDto;

  @ApiPropertyOptional({
    description: 'Updated vital signs (if any were modified)',
    type: () => VitalSignsDto,
  })
  @Type(() => VitalSignsDto)
  vitalSigns?: VitalSignsDto;

  @ApiProperty({
    description: 'List of fields that were updated',
    example: ['urgencyLevel', 'additionalObservations'],
    type: [String],
  })
  updatedFields: string[];

  @ApiProperty({
    description: 'Timestamp when the update was performed',
    example: '2025-09-29T15:45:00.000Z',
    type: 'string',
    format: 'date-time',
  })
  @Type(() => Date)
  updatedAt: Date;

  @ApiProperty({
    description: 'ID of the user who performed the update',
    example: 47,
    type: 'integer',
  })
  updatedBy: number;

  @ApiProperty({
    description: 'Reason for the update',
    example: 'Patient condition has deteriorated, increasing urgency level',
    type: 'string',
  })
  reason: string;
}
