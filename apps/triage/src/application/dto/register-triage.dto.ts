import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateVitalSignsDto } from './create-vital-signs.dto';

export class RegisterTriageDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  patientId: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  nurseId: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  urgencyLevel: 1 | 2 | 3 | 4 | 5;

  @IsOptional()
  @IsString()
  initialObservations: string;

  @ValidateNested()
  @Type(() => CreateVitalSignsDto)
  vitalSigns: CreateVitalSignsDto;
}
