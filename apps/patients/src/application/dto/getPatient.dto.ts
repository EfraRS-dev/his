import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';


export class GetPatientDto {

    @IsOptional()
    @Type(() => Number) 
    @IsNumber()
    @ApiPropertyOptional()
    patientId?: number;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    documentType?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    documentNumber?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    firstName?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    lastName?: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    criteria: 'document' | 'name' | 'id';
}