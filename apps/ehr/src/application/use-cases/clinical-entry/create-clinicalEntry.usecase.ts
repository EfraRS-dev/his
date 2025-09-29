import { ClinicalEntryRepositoryPort } from "apps/ehr/src/domain/repositories/clinical-entry.repository.port";
import { CreateClinicalEntryDto } from "../../dto/repos_dto/create-clinical-entry.dto";
import { ClinicalEntry } from "apps/ehr/src/domain/entities/clinical-entry.entity";

export class CreateClinicalEntryUseCase {
    constructor(private readonly clinicalEntryPort: ClinicalEntryRepositoryPort){}

    async execute(input: CreateClinicalEntryDto): Promise<ClinicalEntry> {
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