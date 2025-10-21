import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { TriageService } from '../../application/services/triage.service';
import { CreateTriageDto } from '../../application/dto/create-triage.dto';
import { RegisterTriageDto } from '../../application/dto/register-triage.dto';
import { UpdateTriageRequestDto } from '../../application/dto/update-triage-request.dto';
import { UpdatePriorityDto } from '../../application/dto/update-priority.dto';
import { CreateVitalSignsDto } from '../../application/dto/create-vital-signs.dto';
import { DeleteTriageDto } from '../../application/dto/delete-triage.dto';

@ApiTags('triage')
@Controller('triage')
export class TriageController {
  constructor(private readonly triageService: TriageService) {}

  // Health and stats
  @Get('health')
  @ApiOperation({ summary: 'Health check for the Triage service' })
  @ApiOkResponse({ description: 'Service status payload' })
  getHealth() {
    return this.triageService.getHealthCheck();
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get aggregated triage statistics' })
  @ApiOkResponse({
    description: 'Aggregate statistics including counts and averages',
  })
  async getStats() {
    return this.triageService.getTriageStats();
  }

  // Queue listing
  @Get('queue')
  @ApiOperation({ summary: 'List patients ordered by priority' })
  @ApiQuery({
    name: 'urgencyLevel',
    required: false,
    description: 'Filter by urgency level (1-5)',
  })
  @ApiQuery({
    name: 'includeAllLevels',
    required: false,
    description: 'If true, include all levels in summary',
  })
  @ApiOkResponse({ description: 'Queue and aggregates' })
  async listQueue(
    @Query('urgencyLevel') urgencyLevel?: string,
    @Query('includeAllLevels') includeAllLevels?: string,
  ) {
    const parsedLevel = urgencyLevel
      ? (Number(urgencyLevel) as 1 | 2 | 3 | 4 | 5)
      : undefined;
    const parsedIncludeAll = includeAllLevels
      ? includeAllLevels === 'true' || includeAllLevels === '1'
      : false;
    return this.triageService.listPatientsByPriority({
      urgencyLevel: parsedLevel,
      includeAllLevels: parsedIncludeAll,
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create a basic triage record' })
  @ApiBody({ type: CreateTriageDto })
  @ApiCreatedResponse({ description: 'Triage created' })
  @ApiBadRequestResponse({
    description: 'Invalid input data or validation failed',
  })
  @ApiNotFoundResponse({ description: 'Patient or nurse not found' })
  async create(@Body() dto: CreateTriageDto) {
    return this.triageService.createTriage(dto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a triage with initial vital signs' })
  @ApiBody({ type: RegisterTriageDto })
  @ApiCreatedResponse({ description: 'Triage and vital signs registered' })
  @ApiBadRequestResponse({
    description: 'Invalid input data or validation failed',
  })
  @ApiNotFoundResponse({ description: 'Patient or nurse not found' })
  async register(@Body() dto: RegisterTriageDto) {
    return this.triageService.registerTriage(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a triage by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: 'Triage details' })
  @ApiBadRequestResponse({ description: 'Invalid triage ID format' })
  @ApiNotFoundResponse({ description: 'Triage not found' })
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.triageService.getTriage(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a triage and/or vital signs' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateTriageRequestDto })
  @ApiOkResponse({ description: 'Updated triage data' })
  @ApiBadRequestResponse({ description: 'Invalid input data or triage ID' })
  @ApiNotFoundResponse({ description: 'Triage or user not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTriageRequestDto,
  ) {
    return this.triageService.updateTriage(id, {
      urgencyLevel: dto.urgencyLevel,
      initialObservations: dto.additionalObservations,
      temperature: dto.vitalSigns?.temperature,
      bloodPressure: dto.vitalSigns?.bloodPressure,
      heartRate: dto.vitalSigns?.heartRate,
      respiratoryRate: dto.vitalSigns?.respiratoryRate,
      oxygenSaturation: dto.vitalSigns?.oxygenSaturation,
      additionalNotes: dto.vitalSigns?.additionalNotes,
    });
  }

  @Patch(':id/priority')
  @ApiOperation({ summary: 'Update only the triage priority' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdatePriorityDto })
  @ApiOkResponse({ description: 'Priority updated' })
  @ApiBadRequestResponse({ description: 'Invalid priority level or triage ID' })
  @ApiNotFoundResponse({ description: 'Triage not found' })
  async updatePriority(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePriorityDto,
  ) {
    return this.triageService.updatePriority(id, dto.urgencyLevel, dto.reason);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a triage entity' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: DeleteTriageDto })
  @ApiOkResponse({ description: 'Deletion result' })
  @ApiBadRequestResponse({ description: 'Invalid triage ID or user ID' })
  @ApiNotFoundResponse({ description: 'Triage not found' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: DeleteTriageDto,
  ) {
    return this.triageService.deleteTriage(
      id,
      Number(body.userId),
      body.reason,
    );
  }

  // Patient-centered endpoints
  @Get('patient/:patientId')
  @ApiOperation({ summary: 'Get the triage history by patient' })
  @ApiParam({ name: 'patientId', type: Number })
  @ApiOkResponse({ description: 'Latest or historical triage for the patient' })
  @ApiBadRequestResponse({ description: 'Invalid patient ID format' })
  @ApiNotFoundResponse({
    description: 'Patient not found or no triage records',
  })
  async getByPatient(@Param('patientId', ParseIntPipe) patientId: number) {
    return this.triageService.getTriageByPatient(patientId);
  }

  @Get('patient/:patientId/active')
  @ApiOperation({ summary: 'Get the active triage by patient' })
  @ApiParam({ name: 'patientId', type: Number })
  @ApiOkResponse({ description: 'Active triage if any' })
  @ApiBadRequestResponse({ description: 'Invalid patient ID format' })
  @ApiNotFoundResponse({ description: 'Patient not found or no active triage' })
  async getActive(@Param('patientId', ParseIntPipe) patientId: number) {
    return this.triageService.getActiveTriage(patientId);
  }

  // Vital signs
  @Post(':id/vital-signs')
  @ApiOperation({ summary: 'Register vital signs for a triage' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateVitalSignsDto })
  @ApiCreatedResponse({ description: 'Vital signs stored' })
  @ApiBadRequestResponse({
    description: 'Invalid vital signs data or triage ID',
  })
  @ApiNotFoundResponse({ description: 'Triage not found' })
  async addVitalSigns(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateVitalSignsDto,
  ) {
    return this.triageService.registerVitalSigns({ triageId: id, ...dto });
  }

  @Get(':id/vital-signs')
  @ApiOperation({ summary: 'Get vital signs by triage ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: 'Vital signs for the triage if any' })
  @ApiBadRequestResponse({ description: 'Invalid triage ID format' })
  @ApiNotFoundResponse({ description: 'Triage or vital signs not found' })
  async getVitalSignsByTriage(@Param('id', ParseIntPipe) id: number) {
    return this.triageService.getVitalSignsByTriage(id);
  }

  @Get('vital-signs/:vitalSignsId')
  @ApiOperation({ summary: 'Get vital signs by ID' })
  @ApiParam({ name: 'vitalSignsId', type: Number })
  @ApiOkResponse({ description: 'Vital signs record' })
  @ApiBadRequestResponse({ description: 'Invalid vital signs ID format' })
  @ApiNotFoundResponse({ description: 'Vital signs not found' })
  async getVitalSigns(
    @Param('vitalSignsId', ParseIntPipe) vitalSignsId: number,
  ) {
    return this.triageService.getVitalSigns(vitalSignsId);
  }
}
