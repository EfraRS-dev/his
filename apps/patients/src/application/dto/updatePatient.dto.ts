import { IsString, IsNumber, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePatientDto {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    patientId: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    address?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    @IsEmail()
    @ApiPropertyOptional()
    email?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    emergencyContact?: string;
}