import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTriageDto {
  @ApiProperty({
    description: 'Patient ID',
    example: 4,
    type: 'integer',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  patientId: number;

  @ApiProperty({
    description: 'Urgency level: 1 (critical) to 5 (very low)',
    example: 3,
    enum: [1, 2, 3, 4, 5],
    enumName: 'UrgencyLevel',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  urgencyLevel: 1 | 2 | 3 | 4 | 5;

  @ApiPropertyOptional({
    description: 'Initial observations about the patient condition',
    example: 'Patient complains of chest pain and difficulty breathing',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  initialObservations: string;

  @ApiProperty({
    description: 'ID of the nurse performing the triage',
    example: 45,
    type: 'integer',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  nurseId: number;
}
