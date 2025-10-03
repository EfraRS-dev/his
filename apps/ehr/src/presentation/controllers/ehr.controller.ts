import { Controller, Get, Post, Put, Body, Param, Query, Delete, ParseIntPipe } from '@nestjs/common';
import { CreateAntecedentUseCase } from '../../application/use-cases/antecedent/create-antecedent.usecase';
import { DeleteAntecedentUseCase } from '../../application/use-cases/antecedent/delete-antecedent.usecase';
import { UpdateAntecedentUseCase } from '../../application/use-cases/antecedent/update-antecedent.usecase';
import { CreateClinicalEntryUseCase } from '../../application/use-cases/clinical-entry/create-clinicalEntry.usecase';
import { UpdateClinicalEntryUseCase } from '../../application/use-cases/clinical-entry/update-clinicalEntry.usecase';
import { CreateMedicalHistoryUseCase } from '../../application/use-cases/medical-history/create-medialHistory.usecase';
import { ArchiveMedicalHistoryUseCase } from '../../application/use-cases/medical-history/archive-medicalHistory.usecase';
import { GetMedicalHistoryCompleteUseCase } from '../../application/use-cases/medical-history/getMedicalHistoryComplete.usecase';
import { CreateAntecedentDto } from '../../application/dto/repos_dto/create-antecedent.dto';
import { UpdateAntecedentDto } from '../../application/dto/repos_dto/update-antecedent.dto';
import { CreateClinicalEntryDto } from '../../application/dto/repos_dto/create-clinical-entry.dto';
import { UpdateClinicalEntryDto } from '../../application/dto/repos_dto/update-clinical-entry.dto';
import { UnarchiveMedicalHistoryUseCase } from '../../application/use-cases/medical-history/unarchive-medicalHistory.usecase';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('ehr')
@Controller('ehr')
export class EhrController {
  constructor(
    private readonly createAntecedentUC: CreateAntecedentUseCase,
    private readonly deleteAntecedentUC: DeleteAntecedentUseCase,
    private readonly updateAntecedentUC: UpdateAntecedentUseCase,
    private readonly createClinicalEntryUC: CreateClinicalEntryUseCase,
    private readonly updateClinicalEntryUC: UpdateClinicalEntryUseCase,
    private readonly createMedicalHistoryUC: CreateMedicalHistoryUseCase,
    private readonly archiveMedicalHistoryUC: ArchiveMedicalHistoryUseCase,
    private readonly unarchiveMedicalHistoryUC: UnarchiveMedicalHistoryUseCase,
    private readonly getMedicalHistoryUC: GetMedicalHistoryCompleteUseCase
  ){}

  @Post('antecedent')
  @ApiOperation({ summary: 'Create antecedent' })
  @ApiBody({ type: CreateAntecedentDto })
  @ApiResponse({ status: 201, description: 'Antecedent successfully created.' })
  async createAntecedent(@Body() body: CreateAntecedentDto){
    const antecedent = await this.createAntecedentUC.execute(body);
    return antecedent
  }

  @Delete('antecedent/delete/:id')
  @ApiOperation({ summary: 'delete antecedent' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Antecedent successfully deleted.' })
  async deleteAntecedent(@Param('id', ParseIntPipe) id:number){
    return this.deleteAntecedentUC.execute(id);
  }

  @Put('antecedent/update/:id')
  @ApiOperation({ summary: 'update antecedent' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateAntecedentDto })
  @ApiResponse({ status: 200, description: 'Antecedent successfully updated.' })
  async updateAntecedent(@Param('id',ParseIntPipe) id:number, @Body() body: UpdateAntecedentDto){
    return this.updateAntecedentUC.execute(id, body);
  }

  @Post('clinicalEntry')
  @ApiOperation({ summary: 'create clinical entry' })
  @ApiBody({ type: CreateClinicalEntryDto })
  @ApiResponse({ status: 201, description: 'clinical entry successfully created.' })
  async createClinicalEntry(@Body() body: CreateClinicalEntryDto){
    return this.createClinicalEntryUC.execute(body);
  }

  @Put('clinicalEntry/update/:id')
  @ApiOperation({ summary: 'update clinical entry' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateClinicalEntryDto })
  @ApiResponse({ status: 200, description: 'clinical entry successfylly updated' })
  async updateClinicalEntry(@Param('id',ParseIntPipe) id:number, @Body() body: UpdateClinicalEntryDto){
    return this.updateClinicalEntryUC.execute(id, body);
  }

  @Post(':id')
  @ApiOperation({ summary: 'create medical history' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 201, description: 'medical history successfully created.' })
  async createMedicalHistory(@Param('id',ParseIntPipe) patientId:number){
    return this.createMedicalHistoryUC.execute(patientId);
  }

  @Put('archive/:id')
  @ApiOperation({ summary: 'archive medical history' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'medical history succesfully archived.' })
  async archiveMedicalHistory(@Param('id',ParseIntPipe) id:number){
    return this.archiveMedicalHistoryUC.execute(id);
  }

  @Put('unarchive/:id')
  @ApiOperation({ summary: 'unarchive medical history' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'medical history succesfully unarchived.' })
  async unarchiveMedicalHistory(@Param('id',ParseIntPipe) id:number){
    return this.unarchiveMedicalHistoryUC.execute(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get medical history complete' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'medical history successfully got.' })
  async getMedicalHistoryComplete(@Param('id',ParseIntPipe) patientId:number){
    return this.getMedicalHistoryUC.execute(patientId);
  }

}
