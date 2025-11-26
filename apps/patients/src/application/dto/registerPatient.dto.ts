import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsEmail,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PatientRegisterDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 7, description: 'User ID from users microservice' })
  userId?: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 'DNI', description: 'Document type' })
  documentType: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '12345678', description: 'Document number' })
  documentNumber: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John', description: 'Patient first name' })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Doe', description: 'Patient last name' })
  lastName: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ example: '1985-03-15', description: 'Date of birth' })
  birthDate: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Male',
    description: 'Gender',
    enum: ['Male', 'Female', 'Other'],
  })
  gender: 'Male' | 'Female' | 'Other';

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '123 Main St, Springfield',
    description: 'Patient address',
  })
  address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '+1-555-0101', description: 'Phone number' })
  phone: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'john.doe@email.com', description: 'Email address' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '+1-555-0102 (Jane Doe)',
    description: 'Emergency contact',
  })
  emergencyContact: string;
}
