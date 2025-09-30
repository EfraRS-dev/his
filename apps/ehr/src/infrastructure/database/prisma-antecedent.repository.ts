import { Antecedent, AntecedentType } from "../../domain/entities/antecedent.entity";
import { AntecedentRepositoryPort } from "../../domain/repositories/antecedent.repository.port";
import { PrismaService } from "./prisma.service";


export class PrismaAntecedentRepository implements AntecedentRepositoryPort {
    constructor(private readonly prisma: PrismaService) { }

    async save(antecedent: Antecedent): Promise<Antecedent> {
        const created = await this.prisma.antecedent.create({
            data: {
                type: antecedent.type,
                description: antecedent.description,
                historyId: antecedent.historyId,
            },
        });
        return new Antecedent(
            created.type as AntecedentType,
            created.description,
            created.historyId,
            created.antecedentId,
        );
    }

    async findById(antecedentId: number): Promise<Antecedent | null> {
        const antecedent = await this.prisma.antecedent.findUnique({
            where: { antecedentId }
        })
        if (!antecedent) return null;

        // casteo rápido al enum y creación de la entidad de dominio
        return new Antecedent(
            antecedent.type as AntecedentType,
            antecedent.description,
            antecedent.historyId,
            antecedent.antecedentId,
        );
    }

    async delete(antecedentId: number): Promise<void> {
        await this.prisma.antecedent.delete({
            where: { antecedentId },
        });
    }

    async update(antecedent: Antecedent): Promise<Antecedent> {
        const updated = await this.prisma.antecedent.update({
            where: { antecedentId: antecedent.antecedentId }, // identificador
            data: {
                type: antecedent.type,
                description: antecedent.description,
                historyId: antecedent.historyId,
            },
        });

        return new Antecedent(
            updated.type as AntecedentType,
            updated.description,
            updated.historyId,
            updated.antecedentId,
        );
    }
}