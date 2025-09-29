import { ClinicalEntryType } from "apps/ehr/src/domain/entities/clinical-entry.entity";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateClinicalEntryDto {

    @IsInt()
    @IsNotEmpty()
    entryId: number;

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