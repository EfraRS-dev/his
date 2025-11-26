import { ClinicalEntryRepositoryPort } from "apps/ehr/src/domain/repositories/clinical-entry.repository.port";
import { MedicalHistoryRepositoryPort } from "apps/ehr/src/domain/repositories/medical-history.repository.port";

export class AiDiagnosisUseCase {
    constructor(private readonly clinicalEntryRepository: ClinicalEntryRepositoryPort, private readonly medicalHistoryPort: MedicalHistoryRepositoryPort) {}

    async execute(patientId: number, information: string): Promise<string> {
        const history = await this.medicalHistoryPort.GetMedicalHistoryComplete(patientId);
        if(!history) throw new Error('Medical history not found');
        const filteredInfo = await this.clinicalEntryRepository.filterInfoToAi(information, history);
        const diagnosis = await this.clinicalEntryRepository.AiDiagnosis(filteredInfo);
        return diagnosis;
    }
}