import { ClinicalEntryRepositoryPort } from "apps/ehr/src/domain/repositories/clinical-entry.repository.port";
import { UpdateClinicalEntryDto } from "../../dto/repos_dto/update-clinical-entry.dto";
import { ClinicalEntry } from "apps/ehr/src/domain/entities/clinical-entry.entity";

export class UpdateClinicalEntryUseCase {
    constructor(private readonly clinicalEntryPort: ClinicalEntryRepositoryPort){}

    async execute(input: UpdateClinicalEntryDto): Promise<ClinicalEntry>{
        const clinicalEntry = await this.clinicalEntryPort.findById(input.entryId)
        if(clinicalEntry){
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
        throw new Error("Clinical entry not found")
    }
}