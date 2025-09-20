export interface RegisterTriageCommand {
  patientId: string;
  nurseId: string;
  urgencyLevel: 1 | 2 | 3 | 4 | 5;
  initialObservations: string;
  vitalSigns: {
    temperature: number;
    bloodPressure: string;
    heartRate: number;
    respiratoryRate: number;
    oxygenSaturation: number;
    additionalNotes?: string;
  };
}

export interface RegisterTriageResult {
  triageId: string;
  patientId: string;
  urgencyLevel: 1 | 2 | 3 | 4 | 5;
  urgencyDescription: string;
  createdAt: Date;
  nurseId: string;
  vitalSignsId: string;
  estimatedWaitTime: string;
  success: boolean;
  message: string;
}

export class RegisterTriageUseCase {
  constructor(
    private readonly triageRepository: any, // Replace with proper interface
    private readonly vitalSignsRepository: any, // Replace with proper interface
  ) {}

  async execute(command: RegisterTriageCommand): Promise<RegisterTriageResult> {
    try {
      // Check if patient already has an active triage
      const existingTriage = await this.triageRepository.findActiveByPatientId(command.patientId);
      if (existingTriage) {
        throw new Error('Patient already has an active triage. Please update the existing one instead.');
      }

      // Create triage
      const triageId = this.generateTriageId();
      const triage = {
        triageId,
        patientId: command.patientId,
        createdAt: new Date(),
        urgencyLevel: command.urgencyLevel,
        initialObservations: command.initialObservations,
        nurseId: command.nurseId,
      };

      await this.triageRepository.save(triage);

      // Create vital signs
      const vitalSignsId = this.generateVitalSignsId();
      const vitalSigns = {
        vitalSignsId,
        triageId,
        temperature: command.vitalSigns.temperature,
        bloodPressure: command.vitalSigns.bloodPressure,
        heartRate: command.vitalSigns.heartRate,
        respiratoryRate: command.vitalSigns.respiratoryRate,
        oxygenSaturation: command.vitalSigns.oxygenSaturation,
        additionalNotes: command.vitalSigns.additionalNotes,
      };

      await this.vitalSignsRepository.save(vitalSigns);

      // Calculate estimated wait time based on urgency level
      const estimatedWaitTime = this.calculateEstimatedWaitTime(command.urgencyLevel);

      return {
        triageId,
        patientId: command.patientId,
        urgencyLevel: command.urgencyLevel,
        urgencyDescription: this.getUrgencyDescription(command.urgencyLevel),
        createdAt: triage.createdAt,
        nurseId: command.nurseId,
        vitalSignsId,
        estimatedWaitTime,
        success: true,
        message: 'Triage registered successfully',
      };
    } catch (error) {
      throw new Error(`Failed to register triage: ${error}`);
    }
  }

  private generateTriageId(): string {
    return 'triage-' + Math.random().toString(36).substr(2, 9);
  }

  private generateVitalSignsId(): string {
    return 'vitals-' + Math.random().toString(36).substr(2, 9);
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
}