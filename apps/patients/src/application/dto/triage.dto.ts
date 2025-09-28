export interface Triage{
    triageId: number,
    patientId: number,
    createdAt: Date,
    urgencyLevel: 1 | 2 | 3 | 4 | 5,
    initialObservations: string,
    nurseId: string
}