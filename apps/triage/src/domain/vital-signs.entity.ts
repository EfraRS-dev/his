export class VitalSigns {
  constructor(
    public readonly vitalSignsId: number,
    public readonly triageId: number,
    public readonly temperature: number,
    public readonly bloodPressure: string,
    public readonly heartRate: number,
    public readonly respiratoryRate: number,
    public readonly oxygenSaturation: number,
    public readonly additionalNotes?: string,
  ) {}

  static create(
    vitalSignsId: number,
    triageId: number,
    temperature: number,
    bloodPressure: string,
    heartRate: number,
    respiratoryRate: number,
    oxygenSaturation: number,
    additionalNotes?: string,
  ): VitalSigns {
    return new VitalSigns(
      vitalSignsId,
      triageId,
      temperature,
      bloodPressure,
      heartRate,
      respiratoryRate,
      oxygenSaturation,
      additionalNotes,
    );
  }

  updateNotes(additionalNotes: string): VitalSigns {
    const updatedNotes = this.additionalNotes
      ? `${this.additionalNotes}\n${additionalNotes}`
      : additionalNotes;

    return new VitalSigns(
      this.vitalSignsId,
      this.triageId,
      this.temperature,
      this.bloodPressure,
      this.heartRate,
      this.respiratoryRate,
      this.oxygenSaturation,
      updatedNotes,
    );
  }
}
