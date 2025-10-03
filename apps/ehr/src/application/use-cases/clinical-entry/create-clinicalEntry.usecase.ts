import { ClinicalEntryRepositoryPort } from "apps/ehr/src/domain/repositories/clinical-entry.repository.port";
import { CreateClinicalEntryDto } from "../../dto/repos_dto/create-clinical-entry.dto";
import { ClinicalEntry } from "apps/ehr/src/domain/entities/clinical-entry.entity";
import { MedicalHistoryRepositoryPort } from "apps/ehr/src/domain/repositories/medical-history.repository.port";

export class CreateClinicalEntryUseCase {
    constructor(private readonly clinicalEntryPort: ClinicalEntryRepositoryPort,
        private readonly medicalHistoryPort: MedicalHistoryRepositoryPort
    ){}

    async execute(input: CreateClinicalEntryDto): Promise<ClinicalEntry> {
        const history = await this.medicalHistoryPort.findByHistoryId(input.historyId)
        if(!history) throw new Error("history not found, impossible add a clinical entry")
        if(!history.status) throw new Error("History is archived, cannot add clinical entries")
        const date = new Date()
        const clinicalEntry = new ClinicalEntry(
            input.historyId, 
            date,  
            input.type, 
            input.reasonForVisit, 
            input.diagnosis, 
            input.notes, 
            input.doctorId )
        return this.clinicalEntryPort.save(clinicalEntry)
    }
}