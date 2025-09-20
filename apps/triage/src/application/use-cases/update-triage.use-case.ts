export interface UpdateTriageCommand {
  triageId: string;
  urgencyLevel?: 1 | 2 | 3 | 4 | 5;
  initialObservations?: string;
  nurseId: string;
  vitalSigns?: {
    temperature?: number;
    bloodPressure?: string;
    heartRate?: number;
    respiratoryRate?: number;
    oxygenSaturation?: number;
    additionalNotes?: string;
  };
  status?: 'active' | 'completed' | 'cancelled';
  reason: string;
}

export interface UpdateTriageResult {
  triageId: string;
  patientId: string;
  urgencyLevel: 1 | 2 | 3 | 4 | 5;
  urgencyDescription: string;
  previousUrgencyLevel?: 1 | 2 | 3 | 4 | 5;
  updatedAt: Date;
  updatedBy: string;
  reason: string;
  estimatedWaitTime: string;
  vitalSignsUpdated: boolean;
  statusChanged: boolean;
  success: boolean;
  message: string;
}

export class UpdateTriageUseCase {
  constructor(
    private readonly triageRepository: any, // Replace with proper interface
    private readonly vitalSignsRepository: any, // Replace with proper interface
    private readonly nurseRepository: any, // Replace with proper interface
  ) {}

  async execute(command: UpdateTriageCommand): Promise<UpdateTriageResult> {
    try {
      // Find existing triage
      const existingTriage = await this.triageRepository.findById(command.triageId);
      if (!existingTriage) {
        throw new Error('Triage not found');
      }

      // Store previous state for comparison
      const previousUrgencyLevel = existingTriage.urgencyLevel;
      const previousStatus = existingTriage.status;

      // Prepare update data
      const updateData: any = {
        updatedAt: new Date(),
        updatedBy: command.nurseId,
        updateReason: command.reason,
      };

      // Update urgency level if provided
      if (command.urgencyLevel !== undefined) {
        updateData.urgencyLevel = command.urgencyLevel;
      }

      // Update observations if provided
      if (command.initialObservations !== undefined) {
        updateData.initialObservations = command.initialObservations;
      }

      // Update status if provided
      if (command.status !== undefined) {
        updateData.status = command.status;
      }

      // Update triage
      await this.triageRepository.update(command.triageId, updateData);

      // Update vital signs if provided
      let vitalSignsUpdated = false;
      if (command.vitalSigns) {
        const existingVitalSigns = await this.vitalSignsRepository.findByTriageId(command.triageId);
        
        if (existingVitalSigns) {
          const vitalSignsUpdate: any = {};
          
          if (command.vitalSigns.temperature !== undefined) {
            vitalSignsUpdate.temperature = command.vitalSigns.temperature;
          }
          if (command.vitalSigns.bloodPressure !== undefined) {
            vitalSignsUpdate.bloodPressure = command.vitalSigns.bloodPressure;
          }
          if (command.vitalSigns.heartRate !== undefined) {
            vitalSignsUpdate.heartRate = command.vitalSigns.heartRate;
          }
          if (command.vitalSigns.respiratoryRate !== undefined) {
            vitalSignsUpdate.respiratoryRate = command.vitalSigns.respiratoryRate;
          }
          if (command.vitalSigns.oxygenSaturation !== undefined) {
            vitalSignsUpdate.oxygenSaturation = command.vitalSigns.oxygenSaturation;
          }
          if (command.vitalSigns.additionalNotes !== undefined) {
            vitalSignsUpdate.additionalNotes = command.vitalSigns.additionalNotes;
          }

          if (Object.keys(vitalSignsUpdate).length > 0) {
            await this.vitalSignsRepository.update(existingVitalSigns.vitalSignsId, vitalSignsUpdate);
            vitalSignsUpdated = true;
          }
        }
      }

      // Get updated triage for response
      const updatedTriage = await this.triageRepository.findById(command.triageId);
      const nurse = await this.nurseRepository.findById(command.nurseId);

      return {
        triageId: command.triageId,
        patientId: updatedTriage.patientId,
        urgencyLevel: updatedTriage.urgencyLevel,
        urgencyDescription: this.getUrgencyDescription(updatedTriage.urgencyLevel),
        previousUrgencyLevel: previousUrgencyLevel !== updatedTriage.urgencyLevel ? previousUrgencyLevel : undefined,
        updatedAt: updateData.updatedAt,
        updatedBy: nurse ? `${nurse.firstName} ${nurse.lastName}` : 'Unknown',
        reason: command.reason,
        estimatedWaitTime: this.calculateEstimatedWaitTime(updatedTriage.urgencyLevel),
        vitalSignsUpdated,
        statusChanged: previousStatus !== updatedTriage.status,
        success: true,
        message: 'Triage updated successfully',
      };
    } catch (error) {
      throw new Error(`Failed to update triage: ${error}`);
    }
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