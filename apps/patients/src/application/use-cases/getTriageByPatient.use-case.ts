import { PatientRepository } from '../../domain/patient.repository';
import { Triage } from '../dto/triage.dto';

export class GetTriageByPatientUseCase{
    constructor(
        private readonly patientRepo: PatientRepository
    ) {}

    async execute(Id: number): Promise<Triage[]>{
        const patient = await this.patientRepo.findPatientById(Id);
        
        if(patient === null){
            throw new Error('Patient not found');
        }

        return this.patientRepo.getTriages(Id);
    }
}