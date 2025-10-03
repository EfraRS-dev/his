import { ApiPropertyOptional } from "@nestjs/swagger";
import { ClinicalDocumentType } from "apps/ehr/src/domain/entities/clinical-document.entity";
import { IsOptional, IsString } from "class-validator";

export class DocumentMetadataDto {
    @ApiPropertyOptional({ example: 'PDF', description: 'Document format' })
    @IsString()
    @IsOptional()
    format: string;
    
    @ApiPropertyOptional({ example: '2MB', description: 'Document size' })
    @IsOptional()
    @IsString()
    size: string;
}

export class UpdateClinicalDocumentDto  {

        @ApiPropertyOptional({ example: 'LAB_RESULT', description: 'Type of clinical document' })
        @IsString()
        @IsOptional()
        type: ClinicalDocumentType;

        @ApiPropertyOptional({ example: 'https://example.com/document.pdf', description: 'URL of the file' })
        @IsString()
        @IsOptional()
        fileUrl: string;

        @ApiPropertyOptional({ type: DocumentMetadataDto, description: 'Metadata of the document' })
        @IsOptional()
        metadata: DocumentMetadataDto;
}