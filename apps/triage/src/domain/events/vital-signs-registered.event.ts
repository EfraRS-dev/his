export class VitalSignsRegisteredEvent {
  constructor(
    public readonly vitalSignsId: number,
    public readonly triageId: number,
    public readonly patientId: number,
    public readonly criticalValues: {
      temperature?: boolean;
      bloodPressure?: boolean;
      heartRate?: boolean;
      oxygenSaturation?: boolean;
    },
    public readonly timestamp: Date = new Date(),
  ) {}

  toJSON() {
    return {
      vitalSignsId: this.vitalSignsId,
      triageId: this.triageId,
      patientId: this.patientId,
      criticalValues: this.criticalValues,
      timestamp: this.timestamp.toISOString(),
    };
  }
}
