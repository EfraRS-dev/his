import { ClinicalEntryType } from "apps/ehr/src/domain/entities/clinical-entry.entity";
import { IsOptional, IsString } from "class-validator";

export class UpdateClinicalEntryDto {


    @IsString()
    @IsOptional()
    type: ClinicalEntryType;

    @IsString()
    @IsOptional()
    reasonForVisit: string;

    @IsString()
    @IsOptional()
    diagnosis: string;

    @IsOptional()
    @IsString()
    notes: string;
}