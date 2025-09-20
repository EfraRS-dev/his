export class Antecedent {
  constructor(
    public readonly antecedentId: string,
    public readonly type: string,
    public readonly description: string,
    public readonly historyId: string,
  ) {}

  static create(
    antecedentId: string,
    type: string,
    description: string,
    historyId: string,
  ): Antecedent {
    return new Antecedent(antecedentId, type, description, historyId);
  }

  updateDescription(description: string): Antecedent {
    return new Antecedent(
      this.antecedentId,
      this.type,
      description,
      this.historyId,
    );
  }
}
