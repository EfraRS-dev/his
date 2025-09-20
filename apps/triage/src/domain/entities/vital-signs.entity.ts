export class VitalSigns {
  constructor(
    public readonly vitalSignsId: string,
    public readonly triageId: string,
    public readonly temperature: number,
    public readonly bloodPressure: string,
    public readonly heartRate: number,
    public readonly respiratoryRate: number,
    public readonly oxygenSaturation: number,
    public readonly additionalNotes?: string,
  ) {}

  static create(
    vitalSignsId: string,
    triageId: string,
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

  isTemperatureNormal(): boolean {
    return this.temperature >= 36.1 && this.temperature <= 37.2;
  }

  isHeartRateNormal(): boolean {
    return this.heartRate >= 60 && this.heartRate <= 100;
  }

  isOxygenSaturationNormal(): boolean {
    return this.oxygenSaturation >= 95;
  }

  getBloodPressureCategory(): string {
    const [systolic, diastolic] = this.bloodPressure.split('/').map(Number);

    if (systolic < 90 || diastolic < 60) {
      return 'Low';
    } else if (systolic >= 140 || diastolic >= 90) {
      return 'High';
    } else if (systolic >= 120 || diastolic >= 80) {
      return 'Elevated';
    } else {
      return 'Normal';
    }
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
