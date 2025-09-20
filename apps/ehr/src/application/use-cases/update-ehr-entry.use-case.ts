export interface UpdateEHREntryCommand {
  entryId: string;
  physicianId: string;
  diagnosis?: string;
  treatment?: string;
  notes?: string;
  status?: 'active' | 'completed' | 'cancelled';
  followUpRequired?: boolean;
  followUpDate?: Date;
  medications?: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions?: string;
  }>;
  reason: string;
}

export interface UpdateEHREntryResult {
  entryId: string;
  patientId: string;
  updatedFields: string[];
  updatedAt: Date;
  updatedBy: string;
  reason: string;
  previousStatus?: string;
  currentStatus: string;
  medicationsUpdated: boolean;
  success: boolean;
  message: string;
}

export class UpdateEHREntryUseCase {
  constructor(
    private readonly clinicalEntryRepository: any, // Replace with proper interface
    private readonly physicianRepository: any, // Replace with proper interface
  ) {}

  async execute(command: UpdateEHREntryCommand): Promise<UpdateEHREntryResult> {
    try {
      // Find existing entry
      const existingEntry = await this.clinicalEntryRepository.findById(command.entryId);
      if (!existingEntry) {
        throw new Error('Clinical entry not found');
      }

      // Store previous state
      const previousStatus = existingEntry.status;
      const updatedFields: string[] = [];

      // Prepare update data
      const updateData: any = {
        updatedAt: new Date(),
        updatedBy: command.physicianId,
        updateReason: command.reason,
      };

      // Update fields if provided
      if (command.diagnosis !== undefined && command.diagnosis !== existingEntry.diagnosis) {
        updateData.diagnosis = command.diagnosis;
        updatedFields.push('diagnosis');
      }

      if (command.treatment !== undefined && command.treatment !== existingEntry.treatment) {
        updateData.treatment = command.treatment;
        updatedFields.push('treatment');
      }

      if (command.notes !== undefined && command.notes !== existingEntry.notes) {
        updateData.notes = command.notes;
        updatedFields.push('notes');
      }

      if (command.status !== undefined && command.status !== existingEntry.status) {
        updateData.status = command.status;
        updatedFields.push('status');
      }

      if (command.followUpRequired !== undefined) {
        updateData.followUpRequired = command.followUpRequired;
        updatedFields.push('followUpRequired');
      }

      if (command.followUpDate !== undefined) {
        updateData.followUpDate = command.followUpDate;
        updatedFields.push('followUpDate');
      }

      // Handle medications update
      let medicationsUpdated = false;
      if (command.medications !== undefined) {
        updateData.medications = JSON.stringify(command.medications);
        updatedFields.push('medications');
        medicationsUpdated = true;
      }

      // Update entry if there are changes
      if (Object.keys(updateData).length > 3) { // More than just metadata fields
        await this.clinicalEntryRepository.update(command.entryId, updateData);
      }

      // Get physician information
      const physician = await this.physicianRepository.findById(command.physicianId);

      return {
        entryId: command.entryId,
        patientId: existingEntry.patientId,
        updatedFields,
        updatedAt: updateData.updatedAt,
        updatedBy: physician ? `Dr. ${physician.firstName} ${physician.lastName}` : 'Unknown',
        reason: command.reason,
        previousStatus: previousStatus !== updateData.status ? previousStatus : undefined,
        currentStatus: updateData.status || existingEntry.status,
        medicationsUpdated,
        success: true,
        message: `Clinical entry updated successfully. Updated fields: ${updatedFields.join(', ')}`,
      };
    } catch (error) {
      throw new Error(`Failed to update EHR entry: ${error}`);
    }
  }
}