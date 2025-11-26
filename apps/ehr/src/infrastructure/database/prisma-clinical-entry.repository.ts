import { HttpException } from '@nestjs/common';
import {
  ClinicalDocument,
  ClinicalDocumentType,
  DocumentMetadata,
} from '../../domain/entities/clinical-document.entity';
import {
  ClinicalEntry,
  ClinicalEntryType,
} from '../../domain/entities/clinical-entry.entity';
import { MedicalHistory } from '../../domain/entities/medical-history.entity';
import { ClinicalEntryRepositoryPort } from '../../domain/repositories/clinical-entry.repository.port';
import { PrismaService } from './prisma.service';
import axios from 'axios';

export class PrismaClinicalEntryRepository
  implements ClinicalEntryRepositoryPort {
  constructor(private readonly prisma: PrismaService) { }
  //private readonly apiUrl = `https://api-inference.huggingface.co/models/${process.env.HUGGINGFACE_MODEL}`;
  private readonly apiKey = process.env.HUGGINGFACE_API_KEY;

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
      created.notes ?? '',
      created.doctorId,
      created.entryId,
    );
  }

  async findById(entryId: number): Promise<ClinicalEntry | null> {
    const clinicalEntry = await this.prisma.clinicalEntry.findUnique({
      where: { entryId },
      include: { clinicalDocuments: true },
    });
    if (!clinicalEntry) return null;
    return new ClinicalEntry(
      clinicalEntry.historyId,
      clinicalEntry.date,
      clinicalEntry.type as ClinicalEntryType,
      clinicalEntry.reasonForVisit,
      clinicalEntry.diagnosis,
      clinicalEntry.notes ?? '',
      clinicalEntry.doctorId,
      clinicalEntry.entryId,
      clinicalEntry.clinicalDocuments.map(
        (doc) =>
          new ClinicalDocument(
            doc.entryId,
            doc.type as ClinicalDocumentType,
            doc.fileUrl,
            doc.metadata ? (doc.metadata as DocumentMetadata) : undefined,
            doc.documentId,
          ),
      ),
    );
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
      updated.notes ?? '',
      updated.doctorId,
      updated.entryId,
      updated.clinicalDocuments.map(
        (doc) =>
          new ClinicalDocument(
            doc.entryId,
            doc.type as ClinicalDocumentType,
            doc.fileUrl,
            doc.metadata ? (doc.metadata as DocumentMetadata) : undefined,
            doc.documentId,
          ),
      ),
    );
  }

async AiDiagnosis(information: string): Promise<string> {
  try {
    const response = await axios.post(
      'https://router.huggingface.co/v1/chat/completions',
      {
        model: process.env.HUGGINGFACE_MODEL, // ahora en el body
        messages: [
          {
            role: 'user',
            content: `
You are a medical assistant AI. Analyze the patient's medical information
and generate possible preliminary diagnoses.

Medical information:
${information}

Provide:
- Preliminary diagnosis
- Risk evaluation
- Initial recommendations (not definitive)

Generate the response in the same language used in the medical history provided.
            `,
          },
        ],
        max_tokens: 512, // ajusta según necesites
      },
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 120000, // 2 minutos
      },
    );

    // nuevo formato de router
    const generated = response.data?.choices?.[0]?.message?.content;

    if (!generated) {
      throw new Error('Unexpected response from the model');
    }

    return generated;
  } catch (error: any) {
    throw new HttpException(
      'No se pudo generar el diagnóstico con HuggingFace: ' + error.message,
      500,
    );
  }
}


  async filterInfoToAi(entry: string, history: MedicalHistory): Promise<string> {
    const lines: string[] = [];

    // --- SECCIÓN 1: Entrada actual del médico ---
    lines.push("=== Current Consultation ===");
    lines.push(entry.trim());
    lines.push("");

    // --- SECCIÓN 2: Historia médica general ---
    lines.push("=== Medical History Summary ===");
    lines.push(`Opened on: ${history.openedAt.toISOString().split("T")[0]}`);
    lines.push("");

    // --- SECCIÓN 3: Antecedentes ---
    if (history.antecedents.length > 0) {
      lines.push("=== Antecedents ===");
      history.antecedents.forEach(a => {
        lines.push(`- ${this.capitalize(a.type)}: ${a.description}`);
      });
      lines.push("");
    }

    // --- SECCIÓN 4: Entradas clínicas ---
    if (history.clinicalEntries.length > 0) {
      lines.push("=== Clinical Entries ===");

      history.clinicalEntries
        .sort((a, b) => a.date.getTime() - b.date.getTime()) // opcional: ordenar por fecha
        .forEach((entry: ClinicalEntry) => {
          lines.push(`Entry Date: ${entry.date.toISOString().split("T")[0]}`);
          lines.push(`Type: ${entry.type}`);
          lines.push(`Reason for Visit: ${entry.reasonForVisit}`);
          lines.push(`Diagnosis: ${entry.diagnosis}`);
          if (entry.notes?.trim()) {
            lines.push(`Notes: ${entry.notes}`);
          }
          lines.push(""); // espacio entre entradas
        });
    }

    return lines.join("\n");
  }

  private capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

}

