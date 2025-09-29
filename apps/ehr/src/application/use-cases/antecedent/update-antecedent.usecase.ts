import { Antecedent } from "apps/ehr/src/domain/entities/antecedent.entity";
import { AntecedentRepositoryPort } from "apps/ehr/src/domain/repositories/antecedent.repository.port";
import { UpdateAntecedentDto } from "../../dto/repos_dto/update-antecedent.dto";

export class UpdateAntecedent {
    constructor(private readonly antecedentPort: AntecedentRepositoryPort) { }

    async execute(input: UpdateAntecedentDto): Promise<Antecedent> {
        const antecedent = await this.antecedentPort.findById(input.antecedentId);
        if (antecedent) {
            const changes: Antecedent = {
                antecedentId: input.antecedentId,
                type: input.type ?? antecedent.type,
                description: input.description ?? antecedent.description,
                historyId: antecedent.historyId,
            }
            return this.antecedentPort.update(changes)
        }
            throw new Error("Antecedent not found")
    }
}