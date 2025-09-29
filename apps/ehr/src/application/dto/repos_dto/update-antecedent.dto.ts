import { AntecedentType } from "apps/ehr/src/domain/entities/antecedent.entity";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateAntecedentDto {

    @IsString()
    @IsOptional()
    type: AntecedentType;

    @IsString()
    @IsOptional()
    description: string;
}