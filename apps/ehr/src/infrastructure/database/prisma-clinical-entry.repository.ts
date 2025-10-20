import { ClinicalDocument, ClinicalDocumentType, DocumentMetadata } from "../../domain/entities/clinical-document.entity";
import { ClinicalEntry, ClinicalEntryType } from "../../domain/entities/clinical-entry.entity";
import { ClinicalEntryRepositoryPort } from "../../domain/repositories/clinical-entry.repository.port";
import { PrismaService } from "./prisma.service";

export class PrismaClinicalEntryRepository implements ClinicalEntryRepositoryPort {
    constructor(private readonly prisma: PrismaService) { }

    async save(entry: ClinicalEntry): Promise<ClinicalEntry> {
        const created = await this.prisma.clinicalEntry.create({
            data: {
                historyId: entry.historyId,
                date: entry.date,
                type: entry.type,
                reasonForVisit: entry.reasonForVisit,
                diagnosis: entry.diagnosis,
                notes: entry.notes,
                doctorId: entry.doctorId,
            },
        });

        return new ClinicalEntry(
            created.historyId,
            created.date,
            created.type as ClinicalEntryType,
            created.reasonForVisit,
            created.diagnosis,
            created.notes ?? "",
            created.doctorId,
            created.entryId,
        )
    }

    async findById(entryId: number): Promise<ClinicalEntry | null> {
        const clinicalEntry = await this.prisma.clinicalEntry.findUnique({
            where: { entryId },
            include: { clinicalDocuments: true },
        })
        if (!clinicalEntry) return null
        return new ClinicalEntry(
            clinicalEntry.historyId,
            clinicalEntry.date,
            clinicalEntry.type as ClinicalEntryType,
            clinicalEntry.reasonForVisit,
            clinicalEntry.diagnosis,
            clinicalEntry.notes ?? "",
            clinicalEntry.doctorId,
            clinicalEntry.entryId,
            clinicalEntry.clinicalDocuments.map(doc => new ClinicalDocument(
                doc.entryId,
                doc.type as ClinicalDocumentType,
                doc.fileUrl,
                doc.metadata ? (doc.metadata as DocumentMetadata) : undefined,
                doc.documentId
            )),
        )
    }

    async update(entry: ClinicalEntry): Promise<ClinicalEntry> {
        const updated = await this.prisma.clinicalEntry.update({
            where: { entryId: entry.entryId }, 
            data: {
                historyId: entry.historyId,       
                date: entry.date,
                type: entry.type,
                reasonForVisit: entry.reasonForVisit,
                diagnosis: entry.diagnosis,
                notes: entry.notes,
                doctorId: entry.doctorId,
            },
            include: {
                clinicalDocuments: true, 
            },
        });

        return new ClinicalEntry(
            updated.historyId,
            updated.date,
            updated.type as ClinicalEntryType,
            updated.reasonForVisit,
            updated.diagnosis,
            updated.notes ?? "",
            updated.doctorId,
            updated.entryId,
            updated.clinicalDocuments.map(doc => new ClinicalDocument(
                doc.entryId,
                doc.type as ClinicalDocumentType,
                doc.fileUrl,
                doc.metadata ? (doc.metadata as DocumentMetadata) : undefined,
                doc.documentId
            )),
        );

    }
}