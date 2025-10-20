import { AntecedentRepositoryPort } from "apps/ehr/src/domain/repositories/antecedent.repository.port";
import { CreateAntecedentDto } from "../../dto/repos_dto/create-antecedent.dto";
import { Antecedent } from "apps/ehr/src/domain/entities/antecedent.entity";
import { randomUUID } from "crypto";
import { MedicalHistoryRepositoryPort } from "apps/ehr/src/domain/repositories/medical-history.repository.port";

export class CreateAntecedentUseCase {
    constructor(private readonly antecedentPort: AntecedentRepositoryPort, 
        private readonly medicalHistoryPort: MedicalHistoryRepositoryPort){}

    async execute(input:CreateAntecedentDto):Promise<Antecedent>{
        const history = await this.medicalHistoryPort.findByHistoryId(input.historyId)
        if(!history) throw new Error("history not found, impossible add an antecedent")
        if(!history.status) throw new Error("History is archived, cannot add antecedents")
        const antecedent = new Antecedent(input.type, input.description, input.historyId)
        return this.antecedentPort.save(antecedent)
    }
}