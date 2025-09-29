import { AntecedentType } from "apps/ehr/src/domain/entities/antecedent.entity"
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateAntecedentDto {
    @IsString()
    @IsNotEmpty()
    type: AntecedentType;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsInt()
    @IsNotEmpty()
    historyId: number;
}