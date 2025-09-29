import { AntecedentRepositoryPort } from "apps/ehr/src/domain/repositories/antecedent.repository.port";
import { CreateAntecedentDto } from "../../dto/repos_dto/create-antecedent.dto";
import { Antecedent } from "apps/ehr/src/domain/entities/antecedent.entity";
import { randomUUID } from "crypto";

export class CreateAntecedentUseCase {
    constructor(private readonly antecedentPort: AntecedentRepositoryPort){}

    async execute(input:CreateAntecedentDto):Promise<Antecedent>{
        const antecedent = new Antecedent(input.type, input.description, input.historyId)
        return this.antecedentPort.save(antecedent)
    }
}