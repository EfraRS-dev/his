export interface QueryClinicalHistoryCommand {
  patientId: string;
  orderBy?: 'date_asc' | 'date_desc';
  limit?: number;
  offset?: number;
  entryType?: 'outpatient' | 'emergency' | 'hospitalization';
}

export interface ClinicalHistoryEntry {
  entryId: string;
  date: Date;
  type: 'outpatient' | 'emergency' | 'hospitalization';
  reasonForVisit: string;
  diagnosis: string;
  notes: string;
  doctorId: string;
  hasDocuments: boolean;
}

export interface ClinicalHistoryResult {
  patientId: string;
  historyId: string;
  historyStatus: 'active' | 'closed';
  openedAt: Date;
  totalEntries: number;
  entries: ClinicalHistoryEntry[];
  antecedents: Array<{
    antecedentId: string;
    type: string;
    description: string;
  }>;
}

export class QueryClinicalHistoryUseCase {
  constructor(
    private readonly medicalHistoryRepository: any,
    private readonly clinicalEntryRepository: any,
    private readonly antecedentRepository: any,
    private readonly clinicalDocumentRepository: any,
  ) {}

  async execute(command: QueryClinicalHistoryCommand): Promise<ClinicalHistoryResult | null> {
    // Find medical history for patient
    const medicalHistory = await this.medicalHistoryRepository.findByPatientId(command.patientId);
    
    if (!medicalHistory) {
      return null; // Patient has no clinical history yet
    }

    // Get clinical entries
    const entries = await this.clinicalEntryRepository.findByHistoryId(
      medicalHistory.historyId,
      {
        orderBy: command.orderBy || 'date_desc',
        limit: command.limit,
        offset: command.offset,
        entryType: command.entryType,
      },
    );

    // Check for documents for each entry
    const entriesWithDocuments: ClinicalHistoryEntry[] = [];
    for (const entry of entries) {
      const hasDocuments = await this.clinicalDocumentRepository.existsByEntryId(entry.entryId);
      entriesWithDocuments.push({
        entryId: entry.entryId,
        date: entry.date,
        type: entry.type,
        reasonForVisit: entry.reasonForVisit,
        diagnosis: entry.diagnosis,
        notes: entry.notes,
        doctorId: entry.doctorId,
        hasDocuments,
      });
    }

    // Get antecedents
    const antecedents = await this.antecedentRepository.findByHistoryId(medicalHistory.historyId);

    // Get total count of entries
    const totalEntries = await this.clinicalEntryRepository.countByHistoryId(medicalHistory.historyId);

    return {
      patientId: command.patientId,
      historyId: medicalHistory.historyId,
      historyStatus: medicalHistory.status,
      openedAt: medicalHistory.openedAt,
      totalEntries,
      entries: entriesWithDocuments,
      antecedents: antecedents.map((ant: any) => ({
        antecedentId: ant.antecedentId,
        type: ant.type,
        description: ant.description,
      })),
    };
  }
}