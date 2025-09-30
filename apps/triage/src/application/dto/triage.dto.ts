import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TriageDto {
  @ApiProperty({
    description: 'Unique identifier for the triage record',
    example: 123,
    type: 'integer',
  })
  triageId: number;

  @ApiProperty({
    description: 'ID of the patient associated with this triage',
    example: 101,
    type: 'integer',
  })
  patientId: number;

  @ApiProperty({
    description: 'Indicates if this triage record is currently active',
    example: true,
    type: 'boolean',
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Timestamp when the triage was created',
    example: '2025-09-29T14:30:00.000Z',
    type: 'string',
    format: 'date-time',
  })
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    description: 'Urgency level: 1 (critical) to 5 (very low)',
    example: 3,
    enum: [1, 2, 3, 4, 5],
    enumName: 'UrgencyLevel',
  })
  urgencyLevel: 1 | 2 | 3 | 4 | 5;

  @ApiProperty({
    description: 'Initial observations about the patient condition',
    example: 'Patient complains of chest pain and difficulty breathing',
    type: 'string',
  })
  initialObservations: string;

  @ApiProperty({
    description: 'ID of the nurse who performed the triage',
    example: 45,
    type: 'integer',
  })
  nurseId: number;
}
