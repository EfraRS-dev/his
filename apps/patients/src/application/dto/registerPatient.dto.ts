import { IsNumber, IsString, IsNotEmpty, IsEmail, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PatientRegisterDto {

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    documentType: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    documentNumber: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    lastName: string;

    @IsNotEmpty()
    @IsDate()
    @ApiProperty()
    birthDate: Date;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    gender: 'Male' | 'Female' | 'Other';

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    address: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    phone: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    emergencyContact: string; 
}