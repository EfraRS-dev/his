import { ApiPropertyOptional } from "@nestjs/swagger";
import { ClinicalEntryType } from "apps/ehr/src/domain/entities/clinical-entry.entity";
import { IsOptional, IsString } from "class-validator";

export class UpdateClinicalEntryDto {

    @ApiPropertyOptional({ example: 'emergency', description: 'Type of clinical entry (outpatient, emergency, hospitalization)' })
    @IsString()
    @IsString()
    @IsOptional()
    type: ClinicalEntryType;

    @ApiPropertyOptional({ example: 'Routine checkup', description: 'Reason for the visit' })
    @IsString()
    @IsOptional()
    reasonForVisit: string;

    @ApiPropertyOptional({ example: 'Healthy', description: 'Diagnosis for the visit' })
    @IsString()
    @IsOptional()
    diagnosis: string;

    @ApiPropertyOptional({ example: 'Patient requested blood test', description: 'Additional notes' })
    @IsOptional()
    @IsString()
    notes: string;
}