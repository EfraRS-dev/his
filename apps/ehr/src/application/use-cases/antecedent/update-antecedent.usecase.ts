import { Antecedent } from "apps/ehr/src/domain/entities/antecedent.entity";
import { AntecedentRepositoryPort } from "apps/ehr/src/domain/repositories/antecedent.repository.port";
import { UpdateAntecedentDto } from "../../dto/repos_dto/update-antecedent.dto";
import { MedicalHistoryRepositoryPort } from "apps/ehr/src/domain/repositories/medical-history.repository.port";

export class UpdateAntecedentUseCase {
    constructor(private readonly antecedentPort: AntecedentRepositoryPort,
        private readonly medicalHistoryPort: MedicalHistoryRepositoryPort
    ) { }

    async execute(antecedentId: number,input: UpdateAntecedentDto): Promise<Antecedent> {
        const antecedent = await this.antecedentPort.findById(antecedentId);
        if (!antecedent) throw new Error("Antecedent not found")
        const history = await this.medicalHistoryPort.findByHistoryId(antecedent.historyId)
        if(!history)throw new Error("Medical history doesn't exist")
        if(!history.status)throw new Error("History is archived, cannot modifiying it")
        const changes: Antecedent = {
            antecedentId: antecedentId,
            type: input.type ?? antecedent.type,
            description: input.description ?? antecedent.description,
            historyId: antecedent.historyId,
        }
            return this.antecedentPort.update(changes)
    }
}