import { AntecedentRepositoryPort } from "apps/ehr/src/domain/repositories/antecedent.repository.port";

export class DeleteAntecedentUseCase {
    constructor(private readonly antecedentPort: AntecedentRepositoryPort){}

        async execute(antecedentId: number): Promise<void>{
            return this.antecedentPort.delete(antecedentId)
        }
}