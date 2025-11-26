import { Antecedent } from "../entities/antecedent.entity";


export interface AntecedentRepositoryPort {
    save(antecedent:Antecedent): Promise<Antecedent>;
    findById(antecedentId: number): Promise<Antecedent | null>;
    //findByHistoryId(historyId: number): Promise<Antecedent[]>;
    delete(antecedentId: number):Promise<void>;
    update(antecedent: Antecedent): Promise<Antecedent>;
}