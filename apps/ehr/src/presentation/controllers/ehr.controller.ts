import { Controller, Get, Post, Put, Body, Param, Query, Delete, ParseIntPipe } from '@nestjs/common';
import { CreateAntecedentUseCase } from '../../application/use-cases/antecedent/create-antecedent.usecase';
import { DeleteAntecedentUseCase } from '../../application/use-cases/antecedent/delete-antecedent.usecase';
import { UpdateAntecedentUseCase } from '../../application/use-cases/antecedent/update-antecedent.usecase';
import { CreateClinicalEntryUseCase } from '../../application/use-cases/clinical-entry/create-clinicalEntry.usecase';
import { UpdateClinicalEntryUseCase } from '../../application/use-cases/clinical-entry/update-clinicalEntry.usecase';
import { CreateMedicalHistoryUseCase } from '../../application/use-cases/medical-history/create-medialHistory.usecase';
import { ArchiveMedicalHistoryUeCase } from '../../application/use-cases/medical-history/archive-medicalHistory.usecase';
import { GetMedicalHistoryCompleteUseCase } from '../../application/use-cases/medical-history/getMedicalHistoryComplete.usecase';
import { CreateAntecedentDto } from '../../application/dto/repos_dto/create-antecedent.dto';
import { UpdateAntecedentDto } from '../../application/dto/repos_dto/update-antecedent.dto';
import { CreateClinicalEntryDto } from '../../application/dto/repos_dto/create-clinical-entry.dto';
import { UpdateClinicalEntryDto } from '../../application/dto/repos_dto/update-clinical-entry.dto';

@Controller('ehr')
export class EhrController {
  constructor(
    private readonly createAntecedentUC: CreateAntecedentUseCase,
    private readonly deleteAntecedentUC: DeleteAntecedentUseCase,
    private readonly updateAntecedentUC: UpdateAntecedentUseCase,
    private readonly createClinicalEntryUC: CreateClinicalEntryUseCase,
    private readonly updateClinicalEntryUC: UpdateClinicalEntryUseCase,
    private readonly createMedicalHistoryUC: CreateMedicalHistoryUseCase,
    private readonly archiveMedicalHistoryUC: ArchiveMedicalHistoryUeCase,
    private readonly getMedicalHistoryUC: GetMedicalHistoryCompleteUseCase
  ){}

  @Post('antecedent')
  async createAntecedent(@Body() body: CreateAntecedentDto){
    const antecedent = await this.createAntecedentUC.execute(body);
    return antecedent
  }

  @Delete('antecedent/delete/:id')
  async deleteAntecedent(@Param('id', ParseIntPipe) id:number){
    return this.deleteAntecedentUC.execute(id);
  }

  @Put('antecedent/update/:id')
  async updateAntecedent(@Param('id',ParseIntPipe) id:number, @Body() body: UpdateAntecedentDto){
    return this.updateAntecedentUC.execute(id, body);
  }

  @Post('clinicalEntry')
  async createClinicalEntry(@Body() body: CreateClinicalEntryDto){
    return this.createClinicalEntryUC.execute(body);
  }

  @Put('clinicalEntry/update/:id')
  async updateClinicalEntry(@Param('id',ParseIntPipe) id:number, @Body() body: UpdateClinicalEntryDto){
    return this.updateClinicalEntryUC.execute(id, body);
  }

  @Post(':id')
  async createMedicalHistory(@Param('id',ParseIntPipe) patientId:number){
    return this.createMedicalHistoryUC.execute(patientId);
  }

  @Put('archive/:id')
  async archiveMedicalHistory(@Param('id',ParseIntPipe) id:number){
    return this.archiveMedicalHistoryUC.execute(id);
  }

  @Get(':id')
  async getMedicalHistoryComplete(@Param('id',ParseIntPipe) patientId:number){
    return this.getMedicalHistoryUC.execute(patientId);
  }

}
