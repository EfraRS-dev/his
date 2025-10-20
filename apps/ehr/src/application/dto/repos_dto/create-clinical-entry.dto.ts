import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ClinicalEntryType } from "apps/ehr/src/domain/entities/clinical-entry.entity";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateClinicalEntryDto {

    @ApiProperty({ example: 10, description: 'Medical history ID' })
    @IsInt()
    @IsNotEmpty()
    historyId: number;

    @ApiProperty({ example: 'outpatient', description: 'Type of clinical entry (outpatient, emergency, hospitalization)' })
    @IsString()
    @IsNotEmpty()
    type: ClinicalEntryType;

    @ApiProperty({ example: 'Routine checkup', description: 'Reason for the visit' })
    @IsString()
    @IsNotEmpty()
    reasonForVisit: string;

    @ApiProperty({ example: 'Healthy', description: 'Diagnosis for the visit' })
    @IsString()
    @IsNotEmpty()
    diagnosis: string;

    @ApiPropertyOptional({ example: 'Patient requested blood test', description: 'Additional notes' })
    @IsOptional()
    @IsString()
    notes: string = "";

    @ApiProperty({ example: 5, description: 'Doctor ID' })
    @IsNotEmpty()
    @IsInt()
    doctorId: number;
}