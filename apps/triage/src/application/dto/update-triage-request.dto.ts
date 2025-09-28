import {
  IsOptional,
  IsString,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateVitalSignsDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  temperature?: number;

  @IsOptional()
  @IsString()
  bloodPressure?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  heartRate?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  respiratoryRate?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  oxygenSaturation?: number;

  @IsOptional()
  @IsString()
  additionalNotes?: string;
}

export class UpdateTriageRequestDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  urgencyLevel?: 1 | 2 | 3 | 4 | 5;

  @IsOptional()
  @IsString()
  additionalObservations?: string;

  @IsString()
  reason: string;

  @IsNumber()
  @Type(() => Number)
  updatedBy: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateVitalSignsDto)
  vitalSigns?: UpdateVitalSignsDto;
}
