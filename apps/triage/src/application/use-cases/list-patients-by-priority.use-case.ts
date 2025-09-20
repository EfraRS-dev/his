export interface ListPatientsByPriorityCommand {
  urgencyLevel?: 1 | 2 | 3 | 4 | 5;
  includeAllLevels?: boolean;
  limit?: number;
  offset?: number;
}

export interface PatientTriageInfo {
  patientId: string;
  firstName: string;
  lastName: string;
  documentNumber: string;
  age: number;
  triageId: string;
  urgencyLevel: 1 | 2 | 3 | 4 | 5;
  urgencyDescription: string;
  createdAt: Date;
  waitTime: string;
  nurseId: string;
  nurseName: string;
  initialObservations: string;
  vitalSigns: {
    temperature: number;
    bloodPressure: string;
    heartRate: number;
    respiratoryRate: number;
    oxygenSaturation: number;
  };
}

export interface ListPatientsByPriorityResult {
  patients: PatientTriageInfo[];
  totalCount: number;
  urgencyLevelCounts: {
    level1: number;
    level2: number;
    level3: number;
    level4: number;
    level5: number;
  };
  averageWaitTimes: {
    level1: string;
    level2: string;
    level3: string;
    level4: string;
    level5: string;
  };
  success: boolean;
  message: string;
}

export class ListPatientsByPriorityUseCase {
  constructor(
    private readonly triageRepository: any, // Replace with proper interface
    private readonly patientRepository: any, // Replace with proper interface
    private readonly vitalSignsRepository: any, // Replace with proper interface
    private readonly nurseRepository: any, // Replace with proper interface
  ) {}

  async execute(command: ListPatientsByPriorityCommand): Promise<ListPatientsByPriorityResult> {
    try {
      // Build query criteria
      const criteria: any = { status: 'active' };
      if (command.urgencyLevel && !command.includeAllLevels) {
        criteria.urgencyLevel = command.urgencyLevel;
      }

      // Get active triages
      const activeTriages = await this.triageRepository.findByCriteria(
        criteria,
        command.limit || 50,
        command.offset || 0,
      );

      // Sort by urgency level (1 highest priority)
      const sortedTriages = activeTriages.sort((a: any, b: any) => a.urgencyLevel - b.urgencyLevel);

      // Map to patient triage info
      const patients: PatientTriageInfo[] = [];
      for (const triage of sortedTriages) {
        const patientInfo = await this.mapPatientTriageInfo(triage);
        patients.push(patientInfo);
      }

      // Calculate statistics
      const urgencyLevelCounts = this.calculateUrgencyLevelCounts(activeTriages);
      const averageWaitTimes = await this.calculateAverageWaitTimes();

      return {
        patients,
        totalCount: activeTriages.length,
        urgencyLevelCounts,
        averageWaitTimes,
        success: true,
        message: `Found ${patients.length} patients in triage queue`,
      };
    } catch (error) {
      throw new Error(`Failed to list patients by priority: ${error}`);
    }
  }

  private async mapPatientTriageInfo(triage: any): Promise<PatientTriageInfo> {
    // Get patient details
    const patient = await this.patientRepository.findById(triage.patientId);
    
    // Get vital signs
    const vitalSigns = await this.vitalSignsRepository.findByTriageId(triage.triageId);
    
    // Get nurse information
    const nurse = await this.nurseRepository.findById(triage.nurseId);

    return {
      patientId: triage.patientId,
      firstName: patient.firstName,
      lastName: patient.lastName,
      documentNumber: patient.documentNumber,
      age: this.calculateAge(patient.birthDate),
      triageId: triage.triageId,
      urgencyLevel: triage.urgencyLevel,
      urgencyDescription: this.getUrgencyDescription(triage.urgencyLevel),
      createdAt: triage.createdAt,
      waitTime: this.calculateWaitTime(triage.createdAt),
      nurseId: triage.nurseId,
      nurseName: nurse ? `${nurse.firstName} ${nurse.lastName}` : 'Unknown',
      initialObservations: triage.initialObservations,
      vitalSigns: vitalSigns ? {
        temperature: vitalSigns.temperature,
        bloodPressure: vitalSigns.bloodPressure,
        heartRate: vitalSigns.heartRate,
        respiratoryRate: vitalSigns.respiratoryRate,
        oxygenSaturation: vitalSigns.oxygenSaturation,
      } : {
        temperature: 0,
        bloodPressure: '',
        heartRate: 0,
        respiratoryRate: 0,
        oxygenSaturation: 0,
      },
    };
  }

  private calculateUrgencyLevelCounts(triages: any[]): {
    level1: number;
    level2: number;
    level3: number;
    level4: number;
    level5: number;
  } {
    const counts = { level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 };
    
    triages.forEach((triage: any) => {
      switch (triage.urgencyLevel) {
        case 1: counts.level1++; break;
        case 2: counts.level2++; break;
        case 3: counts.level3++; break;
        case 4: counts.level4++; break;
        case 5: counts.level5++; break;
      }
    });

    return counts;
  }

  private async calculateAverageWaitTimes(): Promise<{
    level1: string;
    level2: string;
    level3: string;
    level4: string;
    level5: string;
  }> {
    // This would typically involve statistical analysis of historical data
    // For now, returning estimated averages based on urgency level
    return {
      level1: 'Immediate',
      level2: '22 minutes',
      level3: '45 minutes',
      level4: '1h 30m',
      level5: '2h 45m',
    };
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

  private calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  private calculateWaitTime(createdAt: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - createdAt.getTime();
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