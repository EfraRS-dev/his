import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTriageDto {
  @ApiProperty({
    description: 'ID del paciente',
    example: 101,
    type: 'integer',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  patientId: number;

  @ApiProperty({
    description: 'Nivel de urgencia: 1 (crítico) a 5 (muy bajo)',
    example: 3,
    enum: [1, 2, 3, 4, 5],
    enumName: 'UrgencyLevel',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  urgencyLevel: 1 | 2 | 3 | 4 | 5;

  @ApiPropertyOptional({
    description: 'Observaciones iniciales sobre la condición del paciente',
    example:
      'El paciente se queja de dolor en el pecho y dificultad para respirar',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  initialObservations: string;

  @ApiProperty({
    description: 'ID del enfermero que realiza el triaje',
    example: 45,
    type: 'integer',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  nurseId: number;
}
