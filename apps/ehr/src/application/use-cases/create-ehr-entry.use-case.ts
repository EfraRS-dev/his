export interface CreateEHREntryCommand {
  patientId: string;
  doctorId: string;
  type: 'outpatient' | 'emergency' | 'hospitalization';
  reasonForVisit: string;
  diagnosis: string;
  notes: string;
  antecedents?: Array<{
    type: string;
    description: string;
  }>;
}

export interface CreateEHREntryResult {
  entryId: string;
  historyId: string;
  patientId: string;
  date: Date;
  type: 'outpatient' | 'emergency' | 'hospitalization';
  reasonForVisit: string;
  diagnosis: string;
  doctorId: string;
  success: boolean;
  message: string;
}

export class CreateEHREntryUseCase {
  constructor(
    private readonly medicalHistoryRepository: any, // Replace with proper interface
    private readonly clinicalEntryRepository: any, // Replace with proper interface
    private readonly antecedentRepository: any, // Replace with proper interface
  ) {}

  async execute(command: CreateEHREntryCommand): Promise<CreateEHREntryResult> {
    try {
      // Find or create medical history for patient
      let medicalHistory = await this.medicalHistoryRepository.findByPatientId(command.patientId);

      if (!medicalHistory) {
        // Create new medical history for the patient
        const historyId = this.generateHistoryId();
        medicalHistory = {
          historyId,
          patientId: command.patientId,
          openedAt: new Date(),
          status: 'active' as const,
        };
        await this.medicalHistoryRepository.save(medicalHistory);
      }

      // Create clinical entry
      const entryId = this.generateEntryId();
      const clinicalEntry = {
        entryId,
        historyId: medicalHistory.historyId,
        date: new Date(),
        type: command.type,
        reasonForVisit: command.reasonForVisit,
        diagnosis: command.diagnosis,
        notes: command.notes,
        doctorId: command.doctorId,
      };

      await this.clinicalEntryRepository.save(clinicalEntry);

      // Create antecedents if provided
      if (command.antecedents && command.antecedents.length > 0) {
        for (const antecedent of command.antecedents) {
          const antecedentId = this.generateAntecedentId();
          const antecedentEntity = {
            antecedentId,
            type: antecedent.type,
            description: antecedent.description,
            historyId: medicalHistory.historyId,
          };
          await this.antecedentRepository.save(antecedentEntity);
        }
      }

      return {
        entryId: clinicalEntry.entryId,
        historyId: medicalHistory.historyId,
        patientId: command.patientId,
        date: clinicalEntry.date,
        type: clinicalEntry.type,
        reasonForVisit: clinicalEntry.reasonForVisit,
        diagnosis: clinicalEntry.diagnosis,
        doctorId: clinicalEntry.doctorId,
        success: true,
        message: 'EHR entry created successfully',
      };
    } catch (error) {
      throw new Error(`Failed to create EHR entry: ${error}`);
    }
  }

  private generateHistoryId(): string {
    return 'history-' + Math.random().toString(36).substr(2, 9);
  }

  private generateEntryId(): string {
    return 'entry-' + Math.random().toString(36).substr(2, 9);
  }

  private generateAntecedentId(): string {
    return 'antecedent-' + Math.random().toString(36).substr(2, 9);
  }
}
