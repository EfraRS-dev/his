import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePriorityDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  urgencyLevel: 1 | 2 | 3 | 4 | 5;

  @IsString()
  reason: string;

  @IsNumber()
  @Type(() => Number)
  updatedBy: number;
}
