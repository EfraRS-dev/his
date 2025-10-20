export class Triage {
  constructor(
    public readonly triageId: number,
    public readonly patientId: number,
    public readonly isActive: boolean = true,
    public readonly createdAt: Date,
    public readonly urgencyLevel: 1 | 2 | 3 | 4 | 5,
    public readonly initialObservations: string,
    public readonly nurseId: number,
  ) {}

  static create(
    triageId: number,
    patientId: number,
    urgencyLevel: 1 | 2 | 3 | 4 | 5,
    initialObservations: string,
    nurseId: number,
  ): Triage {
    return new Triage(
      triageId,
      patientId,
      true,
      new Date(),
      urgencyLevel,
      initialObservations,
      nurseId,
    );
  }

  updateUrgencyLevel(urgencyLevel: 1 | 2 | 3 | 4 | 5): Triage {
    return new Triage(
      this.triageId,
      this.patientId,
      this.isActive,
      this.createdAt,
      urgencyLevel,
      this.initialObservations,
      this.nurseId,
    );
  }

  addObservations(additionalObservations: string): Triage {
    const updatedObservations = this.initialObservations
      ? `${this.initialObservations}\n${additionalObservations}`
      : additionalObservations;

    return new Triage(
      this.triageId,
      this.patientId,
      this.isActive,
      this.createdAt,
      this.urgencyLevel,
      updatedObservations,
      this.nurseId,
    );
  }

  getUrgencyDescription(): string {
    const descriptions = {
      1: 'Critical',
      2: 'High',
      3: 'Medium',
      4: 'Low',
      5: 'Very Low',
    };

    return descriptions[this.urgencyLevel];
  }
}
