export interface QueryTriageByPatientCommand {
  patientId: string;
  includeHistory?: boolean;
}

export interface TriageRecord {
  triageId: string;
  patientId: string;
  urgencyLevel: 1 | 2 | 3 | 4 | 5;
  urgencyDescription: string;
  initialObservations: string;
  nurseId: string;
  nurseName: string;
  createdAt: Date;
  updatedAt?: Date;
  status: 'active' | 'completed' | 'cancelled';
  vitalSigns: {
    vitalSignsId: string;
    temperature: number;
    bloodPressure: string;
    heartRate: number;
    respiratoryRate: number;
    oxygenSaturation: number;
    additionalNotes?: string;
  };
  estimatedWaitTime: string;
  actualWaitTime?: string;
}

export interface QueryTriageByPatientResult {
  patientId: string;
  activeTriage?: TriageRecord;
  triageHistory: TriageRecord[];
  totalTriageVisits: number;
  success: boolean;
  message: string;
}

export class QueryTriageByPatientUseCase {
  constructor(
    private readonly triageRepository: any, // Replace with proper interface
    private readonly vitalSignsRepository: any, // Replace with proper interface
    private readonly nurseRepository: any, // Replace with proper interface
  ) {}

  async execute(command: QueryTriageByPatientCommand): Promise<QueryTriageByPatientResult> {
    try {
      // Find active triage
      const activeTriage = await this.triageRepository.findActiveByPatientId(command.patientId);
      
      // Find triage history if requested
      let triageHistory: TriageRecord[] = [];
      if (command.includeHistory) {
        const historicalTriages = await this.triageRepository.findByPatientId(command.patientId);
        triageHistory = await this.mapTriageRecords(historicalTriages.filter((t: any) => t.status !== 'active'));
      }

      // Map active triage if exists
      let activeTriageRecord: TriageRecord | undefined;
      if (activeTriage) {
        const mappedRecords = await this.mapTriageRecords([activeTriage]);
        activeTriageRecord = mappedRecords[0];
      }

      return {
        patientId: command.patientId,
        activeTriage: activeTriageRecord,
        triageHistory,
        totalTriageVisits: triageHistory.length + (activeTriageRecord ? 1 : 0),
        success: true,
        message: activeTriageRecord 
          ? 'Patient has active triage and history retrieved'
          : 'No active triage found, history retrieved',
      };
    } catch (error) {
      throw new Error(`Failed to query triage by patient: ${error}`);
    }
  }

  private async mapTriageRecords(triages: any[]): Promise<TriageRecord[]> {
    const records: TriageRecord[] = [];

    for (const triage of triages) {
      // Get vital signs
      const vitalSigns = await this.vitalSignsRepository.findByTriageId(triage.triageId);
      
      // Get nurse information
      const nurse = await this.nurseRepository.findById(triage.nurseId);

      const record: TriageRecord = {
        triageId: triage.triageId,
        patientId: triage.patientId,
        urgencyLevel: triage.urgencyLevel,
        urgencyDescription: this.getUrgencyDescription(triage.urgencyLevel),
        initialObservations: triage.initialObservations,
        nurseId: triage.nurseId,
        nurseName: nurse ? `${nurse.firstName} ${nurse.lastName}` : 'Unknown',
        createdAt: triage.createdAt,
        updatedAt: triage.updatedAt,
        status: triage.status,
        vitalSigns: vitalSigns ? {
          vitalSignsId: vitalSigns.vitalSignsId,
          temperature: vitalSigns.temperature,
          bloodPressure: vitalSigns.bloodPressure,
          heartRate: vitalSigns.heartRate,
          respiratoryRate: vitalSigns.respiratoryRate,
          oxygenSaturation: vitalSigns.oxygenSaturation,
          additionalNotes: vitalSigns.additionalNotes,
        } : {
          vitalSignsId: '',
          temperature: 0,
          bloodPressure: '',
          heartRate: 0,
          respiratoryRate: 0,
          oxygenSaturation: 0,
        },
        estimatedWaitTime: this.calculateEstimatedWaitTime(triage.urgencyLevel),
        actualWaitTime: this.calculateActualWaitTime(triage.createdAt, triage.updatedAt),
      };

      records.push(record);
    }

    return records;
  }

  private getUrgencyDescription(level: 1 | 2 | 3 | 4 | 5): string {
    const descriptions = {
      1: 'Critical - Immediate attention required',
      2: 'High - Urgent care needed',
      3: 'Medium - Moderate urgency',
      4: 'Low - Less urgent',
      5: 'Very Low - Non-urgent',
    };
    return descriptions[level];
  }

  private calculateEstimatedWaitTime(urgencyLevel: 1 | 2 | 3 | 4 | 5): string {
    const waitTimes = {
      1: 'Immediate',
      2: '15-30 minutes',
      3: '30-60 minutes',
      4: '1-2 hours',
      5: '2+ hours',
    };
    return waitTimes[urgencyLevel];
  }

  private calculateActualWaitTime(createdAt: Date, updatedAt?: Date): string | undefined {
    if (!updatedAt) return undefined;
    
    const diffMs = updatedAt.getTime() - createdAt.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 60) {
      return `${diffMins} minutes`;
    } else {
      const hours = Math.floor(diffMins / 60);
      const minutes = diffMins % 60;
      return `${hours}h ${minutes}m`;
    }
  }
}