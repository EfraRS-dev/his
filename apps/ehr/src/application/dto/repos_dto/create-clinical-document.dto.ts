import { ClinicalDocumentType } from "apps/ehr/src/domain/entities/clinical-document.entity";
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class DocumentMetadataDto {
    @IsDate()
    @IsNotEmpty()
    date: Date;

    @IsString()
    @IsOptional()
    format: string;
    
    @IsOptional()
    @IsString()
    size: string;
}

export class CreateClinicalDocumentDto  {
        @IsInt()
        @IsNotEmpty()
        entryId: number;

        @IsString()
        @IsNotEmpty()
        type: ClinicalDocumentType;

        @IsString()
        @IsNotEmpty()
        fileUrl: string;

        @IsOptional()
        metadata: DocumentMetadataDto;
}