export class VitalSignsDto {
  vitalSignsId: number;
  triageId: number;
  temperature: number;
  bloodPressure: string;
  heartRate: number;
  respiratoryRate: number;
  oxygenSaturation: number;
  additionalNotes?: string;
}
