import { Antecedent } from "../../domain/entities/antecedent.entity";
import { ClinicalEntry } from "../../domain/entities/clinical-entry.entity";
import { MedicalHistory } from "../../domain/entities/medical-history.entity";
import { MedicalHistoryRepositoryPort } from "../../domain/repositories/medical-history.repository.port";
import { PrismaService } from "./prisma.service";

export class PrismaMedicalHistory implements MedicalHistoryRepositoryPort {
    constructor(private readonly prisma:PrismaService){}

    async save(medicalHistory: MedicalHistory): Promise<MedicalHistory> {
        const created = await this.prisma.medicalHistory.create({
            data:{
                patientId: medicalHistory.patientId,
                openedAt: medicalHistory.openedAt,
                status: medicalHistory.status
            }
        });

        return new MedicalHistory(
            created.patientId,
            created.openedAt,
            created.status,
            created.historyId
        )
    }

    async findByPatientId(patientId: number): Promise<MedicalHistory | null> {
        const history = await this.prisma.medicalHistory.findUnique({
            where: {patientId}
        });
        if(!history) return null

        return new MedicalHistory(
            history.patientId,
            history.openedAt,
            history.status,
            history.historyId
        )
    }

    async findByHistoryId(historyId: number): Promise<MedicalHistory | null> {
        const history = await this.prisma.medicalHistory.findUnique({
            where: {historyId}
        });
        if(!history) return null
        return new MedicalHistory(
            history.patientId,
            history.openedAt,
            history.status,
            history.historyId
        )
    }

    async archive(historyId: number): Promise<MedicalHistory> {
        const history = await this.prisma.medicalHistory.update({
            where: {historyId},
            data:{
                status: false,
            }
        });

        return new MedicalHistory(
            history.patientId,
            history.openedAt,
            history.status,
            history.historyId
        )
    }

    async unarchive(historyId: number): Promise<MedicalHistory> {
        const history = await this.prisma.medicalHistory.update({
            where: {historyId},
            data:{
                status: true,
            }
        });

        return new MedicalHistory(
            history.patientId,
            history.openedAt,
            history.status,
            history.historyId
        )
    }

    async GetMedicalHistoryComplete(patientId: number): Promise<MedicalHistory | null> {
        const history = await this.prisma.medicalHistory.findUnique({
            where: {patientId},
            include: {
                clinicalEntries: true,
                antecedents: true,
            }
        });
        if(!history) return null

        return new MedicalHistory(
            history.patientId,
            history.openedAt,
            history.status,
            history.historyId,
            history.clinicalEntries as unknown as ClinicalEntry[],
            history.antecedents as unknown as Antecedent[],
        )
    }
}