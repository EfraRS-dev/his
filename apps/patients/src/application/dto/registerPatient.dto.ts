import { IsNumber, IsString, IsNotEmpty, IsEmail, IsDate } from 'class-validator';

export class PatientRegisterDto {

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    documentType: string;

    @IsNotEmpty()
    @IsString()
    documentNumber: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsDate()
    birthDate: Date;

    @IsNotEmpty()
    @IsString()
    gender: 'Male' | 'Female' | 'Other';

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    emergencyContact: string; // Emergency contact phone
}