export enum AntecedentType {
  FAMILY = "familly",
  PATHOLOGICAL = "pathological",
  SURGICAL = "surgical",
  ALLERGIC = "allergic",
  PHARMACOLOGICAL = "pharmacological",
  GYNECO_OBSTETRIC = "gyneco_obstetric",
}

export class Antecedent {
  constructor(
    public  type: AntecedentType,
    public description: string,
    public historyId: number,
    public readonly antecedentId?: number
  ) {}
}
