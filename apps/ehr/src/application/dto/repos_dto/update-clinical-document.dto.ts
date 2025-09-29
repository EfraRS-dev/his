import { ClinicalDocumentType } from "apps/ehr/src/domain/entities/clinical-document.entity";
import { IsOptional, IsString } from "class-validator";

export class DocumentMetadataDto {
    @IsString()
    @IsOptional()
    format: string;
    
    @IsOptional()
    @IsString()
    size: string;
}

export class UpdateClinicalDocumentDto  {

        @IsString()
        @IsOptional()
        type: ClinicalDocumentType;

        @IsString()
        @IsOptional()
        fileUrl: string;

        @IsOptional()
        metadata: DocumentMetadataDto;
}