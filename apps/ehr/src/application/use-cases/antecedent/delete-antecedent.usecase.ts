import { AntecedentRepositoryPort } from "apps/ehr/src/domain/repositories/antecedent.repository.port";

export class DeleteAntecedentUseCase {
    constructor(private readonly antecedentPort: AntecedentRepositoryPort){}

        async execute(antecedentId: number): Promise<void>{
            const antecedent = await this.antecedentPort.findById(antecedentId);
            if(antecedent){
                return this.antecedentPort.delete(antecedentId)
            }
            throw new Error("antecedent Nod found")
        }
}