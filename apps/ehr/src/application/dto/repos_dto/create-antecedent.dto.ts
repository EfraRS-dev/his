import { ApiProperty } from "@nestjs/swagger";
import { AntecedentType } from "apps/ehr/src/domain/entities/antecedent.entity"
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateAntecedentDto {
    @ApiProperty({ example: 'allergic', description: 'Type of antecedent (familly, pathological, surgical, allergic, pharmacological, gyneco_obstetric)' })
    @IsString()
    @IsNotEmpty()
    type: AntecedentType;

    @ApiProperty({ example: 'Peanut allergy', description: 'Description of the antecedent' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: 10, description: 'Medical history ID' })
    @IsInt()
    @IsNotEmpty()
    historyId: number;
}