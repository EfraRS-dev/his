import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VitalSignsDto {
  @ApiProperty({
    description: 'Unique identifier for the vital signs record',
    example: 456,
    type: 'integer',
  })
  vitalSignsId: number;

  @ApiProperty({
    description: 'ID of the associated triage record',
    example: 123,
    type: 'integer',
  })
  triageId: number;

  @ApiProperty({
    description: 'Body temperature in degrees Celsius',
    example: 37.2,
    type: 'number',
  })
  temperature: number;

  @ApiProperty({
    description: 'Blood pressure reading in format systolic/diastolic',
    example: '120/80',
    pattern: '^\\d{2,3}/\\d{2,3}$',
  })
  bloodPressure: string;

  @ApiProperty({
    description: 'Heart rate in beats per minute',
    example: 72,
    minimum: 30,
    maximum: 250,
    type: 'integer',
  })
  heartRate: number;

  @ApiProperty({
    description: 'Respiratory rate in breaths per minute',
    example: 16,
    type: 'integer',
  })
  respiratoryRate: number;

  @ApiProperty({
    description: 'Oxygen saturation percentage',
    example: 98,
    type: 'integer',
  })
  oxygenSaturation: number;

  @ApiPropertyOptional({
    description: 'Additional notes about the vital signs measurement',
    example: 'Patient was calm during measurement',
    maxLength: 500,
  })
  additionalNotes?: string;
}
