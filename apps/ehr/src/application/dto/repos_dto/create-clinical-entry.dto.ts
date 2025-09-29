import { ClinicalEntryType } from "apps/ehr/src/domain/entities/clinical-entry.entity";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateClinicalEntryDto {

    @IsInt()
    @IsNotEmpty()
    historyId: number;

    @IsString()
    @IsNotEmpty()
    type: ClinicalEntryType;

    @IsString()
    @IsNotEmpty()
    reasonForVisit: string;

    @IsString()
    @IsNotEmpty()
    diagnosis: string;

    @IsOptional()
    @IsString()
    notes: string = "";

    @IsNotEmpty()
    @IsInt()
    doctorId: number;
}