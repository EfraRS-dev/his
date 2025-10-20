import { AntecedentType } from "apps/ehr/src/domain/entities/antecedent.entity";

export type AntecedentDto = {
    antecedentId: number;
    type: AntecedentType;
    description: string;
    historyId: number;
}