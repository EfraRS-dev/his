import { Controller, Get, Post, Param, Body, Query, ParseIntPipe, Put } from '@nestjs/common';
import { ArchivePatientUseCase } from '../application/use-cases/archivePatient.use-case';
import { GetMedicalHistoryByPatientUseCase } from '../application/use-cases/getMedicalHistoryByPatient.use-case';
import { GetPatientUseCase } from '../application/use-cases/getPatient.use-case';
import { GetTriageByPatientUseCase } from '../application/use-cases/getTriageByPatient.use-case';
import { PatientRegisterUseCase } from '../application/use-cases/registerPatient.use-case';
import { UpdatePatientUseCase } from '../application/use-cases/updatePatient.use-case';
import { PatientRegisterDto } from '../application/dto/registerPatient.dto';
import { UpdatePatientDto } from '../application/dto/updatePatient.dto';
import { GetPatientDto } from '../application/dto/getPatient.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdatePatientRequestDto } from '../application/dto/updatePatientRequest.dto';

@ApiTags('patients')
@Controller('patients')
export class PatientsController{
    constructor(
        private readonly archivePatient: ArchivePatientUseCase,
        private readonly getMedicalHistory: GetMedicalHistoryByPatientUseCase,
        private readonly getPatient: GetPatientUseCase,
        private readonly getTriage: GetTriageByPatientUseCase,
        private readonly patientRegister: PatientRegisterUseCase,
        private readonly updatePatient: UpdatePatientUseCase
    ){}

    @Post('/register')
    async register(@Body() body: PatientRegisterDto){
        const patient = await this.patientRegister.execute({
            userId: body.userId,
            documentType: body.documentType,
            documentNumber: body.documentNumber,
            firstName: body.firstName,
            lastName: body.lastName,
            birthDate: body.birthDate,
            gender: body.gender,
            address: body.address,
            phone: body.phone,
            email: body.email,
            emergencyContact: body.emergencyContact
        });
        return patient;
    }

    @Put('/update/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePatientRequestDto){
        const updatedPatient = await this.updatePatient.execute({
            patientId: id,
            address: body.address,
            phone: body.phone,
            email: body.email,
            emergencyContact: body.emergencyContact
        });
        return updatedPatient;
    }

    @Put('/archive/:id')
    async archive(@Param('id', ParseIntPipe) id: number){
        const archivedPatient = await this.archivePatient.execute(id);
        return archivedPatient;
    }

    @Get('/document')
    async GetPatientByDocument(@Query() query: GetPatientDto){
        const patient = await this.getPatient.execute({
            documentType: query.documentType, 
            documentNumber: query.documentNumber, 
            criteria: 'document'
        });
        return patient;
    }

    @Get('/name')
    async GetPatientByName(@Query() query: GetPatientDto){
        const patient = await this.getPatient.execute({
            firstName: query.firstName, 
            lastName: query.lastName, 
            criteria: 'name'
        });
        return patient;
    }

    @Get('/triage/:id')
    async GetTriage(@Param('id', ParseIntPipe) id: number){
        const triage = await this.getTriage.execute(id);
        return triage;
    }

    @Get('/:id')
    async GetPatientById(@Param('id', ParseIntPipe) id: number){
        const patient = await this.getPatient.execute({
            patientId: id, 
            criteria: 'id'
        });
        return patient;
    }

    @Get('ehr/:id')
    async GetEhrByPatientId(@Param('id', ParseIntPipe) id: number) {
        const ehrResponse = await this.getMedicalHistory.execute(id);
        return ehrResponse;
    }

    @Get('triage/:id')
    async GetTriageByPatientId(@Param('id', ParseIntPipe) id: number) {
        const triageResponse = await this.getTriage.execute(id);
        return triageResponse;
    }
}
