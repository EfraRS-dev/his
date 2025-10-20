import { AntecedentRepositoryPort } from "apps/ehr/src/domain/repositories/antecedent.repository.port";
import { MedicalHistoryRepositoryPort } from "apps/ehr/src/domain/repositories/medical-history.repository.port";

export class DeleteAntecedentUseCase {
    constructor(private readonly antecedentPort: AntecedentRepositoryPort,
        private readonly medicalHistoryPort: MedicalHistoryRepositoryPort
    ){}

        async execute(antecedentId: number): Promise<void>{
            const antecedent = await this.antecedentPort.findById(antecedentId);
            if(!antecedent)throw new Error("antecedent Nod found")
            const history = await this.medicalHistoryPort.findByHistoryId(antecedent.historyId)
            if(!history)throw new Error("Medical history doesn't exist")
            if(!history.status)throw new Error("History is archived, cannot modifiying it")
            return this.antecedentPort.delete(antecedentId)
        }
}