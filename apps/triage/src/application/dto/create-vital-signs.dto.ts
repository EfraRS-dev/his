import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVitalSignsDto {
  @ApiProperty({
    description: 'Body temperature in degrees Celsius',
    example: 37.2,
    type: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  temperature: number;

  @ApiProperty({
    description: 'Blood pressure reading in format systolic/diastolic',
    example: '120/80',
    pattern: '^\\d{2,3}/\\d{2,3}$',
  })
  @IsNotEmpty()
  @IsString()
  bloodPressure: string;

  @ApiProperty({
    description: 'Heart rate in beats per minute',
    example: 72,
    minimum: 30,
    maximum: 250,
    type: 'integer',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(30)
  @Max(250)
  heartRate: number;

  @ApiProperty({
    description: 'Respiratory rate in breaths per minute',
    example: 16,
    type: 'integer',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  respiratoryRate: number;

  @ApiProperty({
    description: 'Oxygen saturation percentage',
    example: 98,
    type: 'integer',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  oxygenSaturation: number;

  @ApiPropertyOptional({
    description: 'Additional notes about the vital signs measurement',
    example: 'Patient was calm during measurement',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  additionalNotes?: string;
}
