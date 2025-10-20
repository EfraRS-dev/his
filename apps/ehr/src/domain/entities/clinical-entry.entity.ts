import { ClinicalDocument } from "./clinical-document.entity";

export enum ClinicalEntryType {
  OUTPATIENT = "outpatient",
  EMERGENCY = "emergency",
  HOSPITALIZATION = "hospitalization"
}

export class ClinicalEntry {
  constructor(
    public readonly historyId: number,
    public readonly date: Date,
    public type: ClinicalEntryType,
    public reasonForVisit: string,
    public diagnosis: string,
    public notes: string = "",
    public readonly doctorId: number,
    public entryId?: number,
    public clinicalDocuments: ClinicalDocument[] = [],
  ) {}

}
