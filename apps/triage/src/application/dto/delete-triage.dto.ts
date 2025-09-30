import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DeleteTriageDto {
  @ApiProperty({
    description: 'ID of the user performing the deletion',
    example: 47,
    type: 'integer',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @ApiPropertyOptional({
    description: 'Reason for deleting the triage record',
    example: 'Patient was discharged, triage no longer needed',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  reason?: string;
}
