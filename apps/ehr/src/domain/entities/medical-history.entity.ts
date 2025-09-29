import { Antecedent } from "./antecedent.entity";
import { ClinicalEntry } from "./clinical-entry.entity";

export class MedicalHistory {
  constructor(
    public patientId: number,
    public openedAt: Date,
    public status: boolean, //ative o closed
    public readonly historyId?: number,
    public clinicalEntries: ClinicalEntry[] = [],
    public antecedents: Antecedent[] = [],
  ) {}


}
