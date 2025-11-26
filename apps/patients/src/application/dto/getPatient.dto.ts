import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetPatientDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiPropertyOptional({ example: 1, description: 'Patient ID' })
  patientId?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'DNI', description: 'Document type' })
  documentType?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: '12345678', description: 'Document number' })
  documentNumber?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'John', description: 'First name' })
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Doe', description: 'Last name' })
  lastName?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'document',
    description: 'Search criteria',
    enum: ['document', 'name', 'id'],
  })
  criteria: 'document' | 'name' | 'id';
}
