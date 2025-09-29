import { ClinicalEntryType } from "apps/ehr/src/domain/entities/clinical-entry.entity";

export type ClinicalEntryDto = {
        entryId: number,
        historyId: number,
        date: Date,
        type: ClinicalEntryType,
        reasonForVisit: string,
        diagnosis: string,
        notes: string,
        doctorId: number,
}