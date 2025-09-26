import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTriageDto {
  @IsNotEmpty()
  @IsUUID()
  patientId: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  urgencyLevel: 1 | 2 | 3 | 4 | 5;

  @IsOptional()
  @IsString()
  initialObservations: string;

  @IsNotEmpty()
  @IsString()
  nurseId: string;
}
