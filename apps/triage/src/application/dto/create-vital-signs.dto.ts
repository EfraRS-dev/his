import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVitalSignsDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(30)
  @Max(50)
  temperature: number;

  @IsNotEmpty()
  @IsString()
  bloodPressure: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(30)
  @Max(250)
  heartRate: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(5)
  @Max(60)
  respiratoryRate: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(70)
  @Max(100)
  oxygenSaturation: number;

  @IsOptional()
  @IsString()
  additionalNotes?: string;
}
