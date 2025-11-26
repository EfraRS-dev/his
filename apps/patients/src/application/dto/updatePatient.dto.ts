import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsEmail,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePatientDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 2, description: 'Patient ID to update' })
  patientId: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: '456 Oak Ave, Springfield',
    description: 'Updated address',
  })
  address?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: '+1-555-0201',
    description: 'Updated phone number',
  })
  phone?: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({
    example: 'maria.rodriguez@email.com',
    description: 'Updated email',
  })
  email?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: '+1-555-0202 (Carlos Rodriguez)',
    description: 'Updated emergency contact',
  })
  emergencyContact?: string;
}
