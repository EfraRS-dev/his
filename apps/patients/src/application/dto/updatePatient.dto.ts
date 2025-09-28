import { IsString, IsNumber, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class UpdatePatientDto {

    @IsNumber()
    @IsNotEmpty()
    patientId: number;

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsString()
    @IsOptional()
    emergencyContact?: string;
}