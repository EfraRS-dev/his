import {
  IsOptional,
  IsString,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateVitalSignsDto {
  @ApiPropertyOptional({
    description: 'Body temperature in degrees Celsius',
    example: 37.5,
    type: 'number',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  temperature?: number;

  @ApiPropertyOptional({
    description: 'Blood pressure reading in format systolic/diastolic',
    example: '130/85',
    pattern: '^\\d{2,3}/\\d{2,3}$',
  })
  @IsOptional()
  @IsString()
  bloodPressure?: string;

  @ApiPropertyOptional({
    description: 'Heart rate in beats per minute',
    example: 80,
    minimum: 30,
    maximum: 250,
    type: 'integer',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  heartRate?: number;

  @ApiPropertyOptional({
    description: 'Respiratory rate in breaths per minute',
    example: 18,
    type: 'integer',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  respiratoryRate?: number;

  @ApiPropertyOptional({
    description: 'Oxygen saturation percentage',
    example: 96,
    type: 'integer',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  oxygenSaturation?: number;

  @ApiPropertyOptional({
    description: 'Additional notes about the vital signs measurement',
    example: 'Patient was slightly agitated during measurement',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  additionalNotes?: string;
}

export class UpdateTriageRequestDto {
  @ApiPropertyOptional({
    description: 'Updated urgency level: 1 (critical) to 5 (very low)',
    example: 2,
    enum: [1, 2, 3, 4, 5],
    enumName: 'UrgencyLevel',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  urgencyLevel?: 1 | 2 | 3 | 4 | 5;

  @ApiPropertyOptional({
    description: 'Additional observations about the patient condition',
    example: 'Patient showing signs of improvement after initial treatment',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  additionalObservations?: string;

  @ApiProperty({
    description: 'Reason for updating the triage',
    example: 'Patient condition has deteriorated, increasing urgency level',
    type: 'string',
  })
  @IsString()
  reason: string;

  @ApiProperty({
    description: 'ID of the user performing the update',
    example: 47,
    type: 'integer',
  })
  @IsNumber()
  @Type(() => Number)
  updatedBy: number;

  @ApiPropertyOptional({
    description: 'Updated vital signs (if any need to be modified)',
    type: () => UpdateVitalSignsDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateVitalSignsDto)
  vitalSigns?: UpdateVitalSignsDto;
}
