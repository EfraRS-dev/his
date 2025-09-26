export class Triage {
  constructor(
    public readonly triageId: string,
    public readonly patientId: string,
    public readonly createdAt: Date,
    public readonly urgencyLevel: 1 | 2 | 3 | 4 | 5,
    public readonly initialObservations: string,
    public readonly nurseId: string,
  ) {}

  static create(
    triageId: string,
    patientId: string,
    urgencyLevel: 1 | 2 | 3 | 4 | 5,
    initialObservations: string,
    nurseId: string,
  ): Triage {
    return new Triage(
      triageId,
      patientId,
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
