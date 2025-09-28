import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class GetPatientDto {

    @IsOptional()
    @IsNumber()
    patientId?: number;

    @IsOptional()
    @IsString()
    documentType?: string;

    @IsOptional()
    @IsString()
    documentNumber?: string;

    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsNotEmpty()
    @IsString()
    criteria: 'document' | 'name' | 'id';
}