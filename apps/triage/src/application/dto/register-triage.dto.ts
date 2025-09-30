import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateVitalSignsDto } from './create-vital-signs.dto';

export class RegisterTriageDto {
  @ApiProperty({
    description: 'ID of the patient to register for triage',
    example: 101,
    type: 'integer',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  patientId: number;

  @ApiProperty({
    description: 'ID of the nurse performing the triage',
    example: 45,
    type: 'integer',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  nurseId: number;

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
    description: 'Vital signs measurements taken during triage',
    type: () => CreateVitalSignsDto,
  })
  @ValidateNested()
  @Type(() => CreateVitalSignsDto)
  vitalSigns: CreateVitalSignsDto;
}
