import { ApiPropertyOptional } from "@nestjs/swagger";
import { AntecedentType } from "apps/ehr/src/domain/entities/antecedent.entity";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateAntecedentDto {

    @ApiPropertyOptional({ example: 'ALLERGY', description: 'Type of antecedent' })
    @IsString()
    @IsOptional()
    type: AntecedentType;

    @ApiPropertyOptional({ example: 'Peanut allergy', description: 'Description of the antecedent' })
    @IsString()
    @IsOptional()
    description: string;
}