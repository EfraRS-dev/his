import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTriageDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  patientId: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  urgencyLevel: 1 | 2 | 3 | 4 | 5;

  @IsOptional()
  @IsString()
  initialObservations: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  nurseId: number;
}
