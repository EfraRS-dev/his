export interface MedicalHistory{
    historyId: number,
    patientId: number,
    openedAt: Date,
    status: 'active' | 'closed'
}