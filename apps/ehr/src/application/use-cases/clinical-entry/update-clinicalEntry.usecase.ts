import { ClinicalEntryRepositoryPort } from "apps/ehr/src/domain/repositories/clinical-entry.repository.port";
import { UpdateClinicalEntryDto } from "../../dto/repos_dto/update-clinical-entry.dto";
import { ClinicalEntry } from "apps/ehr/src/domain/entities/clinical-entry.entity";
import { MedicalHistoryRepositoryPort } from "apps/ehr/src/domain/repositories/medical-history.repository.port";

export class UpdateClinicalEntryUseCase {
    constructor(private readonly clinicalEntryPort: ClinicalEntryRepositoryPort,
        private readonly medicalHistoryPort: MedicalHistoryRepositoryPort
    ){}

    async execute(entryId: number, input: UpdateClinicalEntryDto): Promise<ClinicalEntry>{
        const clinicalEntry = await this.clinicalEntryPort.findById(entryId)
        if(!clinicalEntry)throw new Error("Clinical entry not found")
        const history = await this.medicalHistoryPort.findByHistoryId(clinicalEntry.historyId)
        if(!history) throw new Error("Medical history doesn't exist")
        if(!history.status) throw new Error("History is archived, cannot modifiying it")
        const changes: ClinicalEntry = {
                historyId: clinicalEntry.historyId,
                date: clinicalEntry.date,
                type: input.type?? clinicalEntry.type,
                reasonForVisit: input.reasonForVisit?? clinicalEntry.reasonForVisit,
                diagnosis: input.diagnosis?? clinicalEntry.diagnosis,
                notes: input.notes?? clinicalEntry.notes,
                doctorId: clinicalEntry.doctorId,
                entryId: clinicalEntry.entryId,
                clinicalDocuments: clinicalEntry.clinicalDocuments
            }
            return this.clinicalEntryPort.update(changes)
    }
}