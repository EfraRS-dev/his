export interface AttachClinicalDocumentsCommand {
  patientId: string;
  physicianId: string;
  documents: Array<{
    title: string;
    type: 'lab_result' | 'radiology' | 'prescription' | 'report' | 'referral' | 'consent' | 'other';
    description?: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    uploadedBy?: string;
  }>;
  entryId?: string; // Optional - link to specific clinical entry
  category: 'diagnostic' | 'treatment' | 'administrative' | 'legal';
}

export interface AttachClinicalDocumentsResult {
  patientId: string;
  documentsAttached: Array<{
    documentId: string;
    title: string;
    type: string;
    filePath: string;
    uploadedAt: Date;
  }>;
  totalDocuments: number;
  entryLinked: boolean;
  linkedEntryId?: string;
  uploadedBy: string;
  success: boolean;
  message: string;
}

export class AttachClinicalDocumentsUseCase {
  constructor(
    private readonly clinicalDocumentRepository: any, // Replace with proper interface
    private readonly clinicalEntryRepository: any, // Replace with proper interface
    private readonly physicianRepository: any, // Replace with proper interface
    private readonly patientRepository: any, // Replace with proper interface
  ) {}

  async execute(command: AttachClinicalDocumentsCommand): Promise<AttachClinicalDocumentsResult> {
    try {
      // Validate patient exists
      const patient = await this.patientRepository.findById(command.patientId);
      if (!patient) {
        throw new Error('Patient not found');
      }

      // Validate physician
      const physician = await this.physicianRepository.findById(command.physicianId);
      if (!physician) {
        throw new Error('Physician not found');
      }

      // Validate clinical entry if provided
      let entryLinked = false;
      if (command.entryId) {
        const entry = await this.clinicalEntryRepository.findById(command.entryId);
        if (!entry) {
          throw new Error('Clinical entry not found');
        }
        entryLinked = true;
      }

      const documentsAttached: Array<{
        documentId: string;
        title: string;
        type: string;
        filePath: string;
        uploadedAt: Date;
      }> = [];

      // Process each document
      for (const doc of command.documents) {
        const documentId = this.generateDocumentId();
        const uploadedAt = new Date();

        const documentData = {
          documentId,
          patientId: command.patientId,
          title: doc.title,
          type: doc.type,
          description: doc.description || '',
          filePath: doc.filePath,
          fileSize: doc.fileSize,
          mimeType: doc.mimeType,
          category: command.category,
          uploadedBy: command.physicianId,
          uploadedAt,
          entryId: command.entryId || null,
          status: 'active',
          accessLevel: 'physician_only', // Default access level
          metadata: JSON.stringify({
            originalFileName: doc.title,
            uploadedByType: 'physician',
            systemGenerated: false,
          }),
        };

        // Save document
        await this.clinicalDocumentRepository.save(documentData);

        // If linked to entry, update the entry
        if (command.entryId) {
          await this.linkDocumentToEntry(command.entryId, documentId);
        }

        documentsAttached.push({
          documentId,
          title: doc.title,
          type: doc.type,
          filePath: doc.filePath,
          uploadedAt,
        });
      }

      return {
        patientId: command.patientId,
        documentsAttached,
        totalDocuments: documentsAttached.length,
        entryLinked,
        linkedEntryId: command.entryId,
        uploadedBy: `Dr. ${physician.firstName} ${physician.lastName}`,
        success: true,
        message: `Successfully attached ${documentsAttached.length} document(s) to patient record`,
      };
    } catch (error) {
      throw new Error(`Failed to attach clinical documents: ${error}`);
    }
  }

  private async linkDocumentToEntry(entryId: string, documentId: string): Promise<void> {
    // Get current entry
    const entry = await this.clinicalEntryRepository.findById(entryId);
    
    // Parse existing attachments
    let attachments: string[] = [];
    if (entry.attachments) {
      try {
        attachments = JSON.parse(entry.attachments);
      } catch {
        attachments = [];
      }
    }

    // Add new document ID
    attachments.push(documentId);

    // Update entry with new attachments
    await this.clinicalEntryRepository.update(entryId, {
      attachments: JSON.stringify(attachments),
      updatedAt: new Date(),
    });
  }

  private generateDocumentId(): string {
    return 'doc-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
  }
}