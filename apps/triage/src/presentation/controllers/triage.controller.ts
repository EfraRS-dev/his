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
  HttpException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
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
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { TriageService } from '../../application/services/triage.service';
import { CreateTriageDto } from '../../application/dto/create-triage.dto';
import { RegisterTriageDto } from '../../application/dto/register-triage.dto';
import { UpdateTriageRequestDto } from '../../application/dto/update-triage-request.dto';
import { UpdatePriorityDto } from '../../application/dto/update-priority.dto';
import { CreateVitalSignsDto } from '../../application/dto/create-vital-signs.dto';
import { DeleteTriageDto } from '../../application/dto/delete-triage.dto';

@Controller('triage')
export class TriageController {
  constructor(private readonly triageService: TriageService) {}

  // Health and stats
  @Get('health')
  @ApiTags('Triage')
  @ApiOperation({ summary: 'Health check for the Triage service' })
  @ApiOkResponse({ description: 'Service status payload' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  getHealth() {
    try {
      return this.triageService.getHealthCheck();
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Failed to check health',
      );
    }
  }

  @Get('stats')
  @ApiTags('Triage')
  @ApiOperation({ summary: 'Get aggregated triage statistics' })
  @ApiOkResponse({
    description: 'Aggregate statistics including counts and averages',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getStats() {
    try {
      return await this.triageService.getTriageStats();
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Failed to retrieve statistics',
      );
    }
  }

  // Queue listing
  @Get('queue')
  @ApiTags('Triage')
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
  @ApiBadRequestResponse({ description: 'Invalid query parameters' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async listQueue(
    @Query('urgencyLevel') urgencyLevel?: string,
    @Query('includeAllLevels') includeAllLevels?: string,
  ) {
    try {
      const parsedLevel = urgencyLevel
        ? (Number(urgencyLevel) as 1 | 2 | 3 | 4 | 5)
        : undefined;
      const parsedIncludeAll = includeAllLevels
        ? includeAllLevels === 'true' || includeAllLevels === '1'
        : false;
      return await this.triageService.listPatientsByPriority({
        urgencyLevel: parsedLevel,
        includeAllLevels: parsedIncludeAll,
      });
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(
        error.message || 'Failed to list queue',
      );
    }
  }

  @Post()
  @ApiTags('Triage')
  @ApiOperation({ summary: 'Create a basic triage record' })
  @ApiBody({ type: CreateTriageDto })
  @ApiCreatedResponse({ description: 'Triage created' })
  @ApiBadRequestResponse({
    description: 'Invalid input data or validation failed',
  })
  @ApiNotFoundResponse({ description: 'Patient or nurse not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(@Body() dto: CreateTriageDto) {
    try {
      return await this.triageService.createTriage(dto);
    } catch (error) {
      if (error.message.includes('not found')) {
        throw new NotFoundException(error.message);
      }
      if (error.message.includes('already has')) {
        throw new BadRequestException(error.message);
      }
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(
        error.message || 'Failed to create triage',
      );
    }
  }

  @Post('register')
  @ApiTags('Triage')
  @ApiOperation({ summary: 'Register a triage with initial vital signs' })
  @ApiBody({ type: RegisterTriageDto })
  @ApiCreatedResponse({ description: 'Triage and vital signs registered' })
  @ApiBadRequestResponse({
    description: 'Invalid input data or validation failed',
  })
  @ApiNotFoundResponse({ description: 'Patient or nurse not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async register(@Body() dto: RegisterTriageDto) {
    try {
      return await this.triageService.registerTriage(dto);
    } catch (error) {
      if (error.message.includes('not found')) {
        throw new NotFoundException(error.message);
      }
      if (
        error.message.includes('already has') ||
        error.message.includes('not have')
      ) {
        throw new BadRequestException(error.message);
      }
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(
        error.message || 'Failed to register triage',
      );
    }
  }

  @Get(':id')
  @ApiTags('Triage')
  @ApiOperation({ summary: 'Get a triage by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: 'Triage details' })
  @ApiBadRequestResponse({ description: 'Invalid triage ID format' })
  @ApiNotFoundResponse({ description: 'Triage not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getById(@Param('id', ParseIntPipe) id: number) {
    try {
      const triage = await this.triageService.getTriage(id);
      if (!triage) {
        throw new NotFoundException(`Triage with ID ${id} not found`);
      }
      return triage;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(
        error.message || 'Failed to retrieve triage',
      );
    }
  }

  @Patch(':id')
  @ApiTags('Triage')
  @ApiOperation({ summary: 'Update a triage and/or vital signs' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateTriageRequestDto })
  @ApiOkResponse({ description: 'Updated triage data' })
  @ApiBadRequestResponse({ description: 'Invalid input data or triage ID' })
  @ApiNotFoundResponse({ description: 'Triage or user not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTriageRequestDto,
  ) {
    try {
      return await this.triageService.updateTriage(id, {
        urgencyLevel: dto.urgencyLevel,
        initialObservations: dto.additionalObservations,
        temperature: dto.vitalSigns?.temperature,
        bloodPressure: dto.vitalSigns?.bloodPressure,
        heartRate: dto.vitalSigns?.heartRate,
        respiratoryRate: dto.vitalSigns?.respiratoryRate,
        oxygenSaturation: dto.vitalSigns?.oxygenSaturation,
        additionalNotes: dto.vitalSigns?.additionalNotes,
      });
    } catch (error) {
      if (error.message.includes('not found')) {
        throw new NotFoundException(error.message);
      }
      if (
        error.message.includes('not have') ||
        error.message.includes('not active')
      ) {
        throw new BadRequestException(error.message);
      }
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(
        error.message || 'Failed to update triage',
      );
    }
  }

  @Patch(':id/priority')
  @ApiTags('Triage')
  @ApiOperation({ summary: 'Update only the triage priority' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdatePriorityDto })
  @ApiOkResponse({ description: 'Priority updated' })
  @ApiBadRequestResponse({ description: 'Invalid priority level or triage ID' })
  @ApiNotFoundResponse({ description: 'Triage not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async updatePriority(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePriorityDto,
  ) {
    try {
      return await this.triageService.updatePriority(
        id,
        dto.urgencyLevel,
        dto.reason,
      );
    } catch (error) {
      if (error.message.includes('not found')) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(
        error.message || 'Failed to update priority',
      );
    }
  }

  @Delete(':id')
  @ApiTags('Triage')
  @ApiOperation({ summary: 'Delete a triage entity' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: DeleteTriageDto })
  @ApiOkResponse({ description: 'Deletion result' })
  @ApiBadRequestResponse({ description: 'Invalid triage ID or user ID' })
  @ApiNotFoundResponse({ description: 'Triage not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: DeleteTriageDto,
  ) {
    try {
      return await this.triageService.deleteTriage(
        id,
        Number(body.userId),
        body.reason,
      );
    } catch (error) {
      if (error.message.includes('not found')) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(
        error.message || 'Failed to delete triage',
      );
    }
  }

  // Patient-centered endpoints
  @Get('patient/:patientId')
  @ApiTags('Triage')
  @ApiOperation({ summary: 'Get the triage history by patient' })
  @ApiParam({ name: 'patientId', type: Number })
  @ApiOkResponse({ description: 'Latest or historical triage for the patient' })
  @ApiBadRequestResponse({ description: 'Invalid patient ID format' })
  @ApiNotFoundResponse({
    description: 'Patient not found or no triage records',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getByPatient(@Param('patientId', ParseIntPipe) patientId: number) {
    try {
      const triage = await this.triageService.getTriageByPatient(patientId);
      if (!triage) {
        throw new NotFoundException(`No triage found for patient ${patientId}`);
      }
      return triage;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(
        error.message || 'Failed to retrieve patient triage',
      );
    }
  }

  @Get('patient/:patientId/active')
  @ApiTags('Triage')
  @ApiOperation({ summary: 'Get the active triage by patient' })
  @ApiParam({ name: 'patientId', type: Number })
  @ApiOkResponse({ description: 'Active triage if any' })
  @ApiBadRequestResponse({ description: 'Invalid patient ID format' })
  @ApiNotFoundResponse({ description: 'Patient not found or no active triage' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getActive(@Param('patientId', ParseIntPipe) patientId: number) {
    try {
      const triage = await this.triageService.getActiveTriage(patientId);
      if (!triage) {
        throw new NotFoundException(
          `No active triage found for patient ${patientId}`,
        );
      }
      return triage;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(
        error.message || 'Failed to retrieve active triage',
      );
    }
  }

  // Vital signs
  @Post(':id/vital-signs')
  @ApiTags('Vital Signs')
  @ApiOperation({ summary: 'Register vital signs for a triage' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateVitalSignsDto })
  @ApiCreatedResponse({ description: 'Vital signs stored' })
  @ApiBadRequestResponse({
    description: 'Invalid vital signs data or triage ID',
  })
  @ApiNotFoundResponse({ description: 'Triage not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async addVitalSigns(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateVitalSignsDto,
  ) {
    try {
      return await this.triageService.registerVitalSigns({
        triageId: id,
        ...dto,
      });
    } catch (error) {
      if (error.message.includes('not found')) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(
        error.message || 'Failed to register vital signs',
      );
    }
  }

  @Get(':id/vital-signs')
  @ApiTags('Vital Signs')
  @ApiOperation({ summary: 'Get vital signs by triage ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: 'Vital signs for the triage if any' })
  @ApiBadRequestResponse({ description: 'Invalid triage ID format' })
  @ApiNotFoundResponse({ description: 'Triage or vital signs not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getVitalSignsByTriage(@Param('id', ParseIntPipe) id: number) {
    try {
      const vitalSigns = await this.triageService.getVitalSignsByTriage(id);
      if (!vitalSigns) {
        throw new NotFoundException(`No vital signs found for triage ${id}`);
      }
      return vitalSigns;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(
        error.message || 'Failed to retrieve vital signs',
      );
    }
  }

  @Get('vital-signs/:vitalSignsId')
  @ApiTags('Vital Signs')
  @ApiOperation({ summary: 'Get vital signs by ID' })
  @ApiParam({ name: 'vitalSignsId', type: Number })
  @ApiOkResponse({ description: 'Vital signs record' })
  @ApiBadRequestResponse({ description: 'Invalid vital signs ID format' })
  @ApiNotFoundResponse({ description: 'Vital signs not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getVitalSigns(
    @Param('vitalSignsId', ParseIntPipe) vitalSignsId: number,
  ) {
    try {
      const vitalSigns = await this.triageService.getVitalSigns(vitalSignsId);
      if (!vitalSigns) {
        throw new NotFoundException(
          `Vital signs with ID ${vitalSignsId} not found`,
        );
      }
      return vitalSigns;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(
        error.message || 'Failed to retrieve vital signs',
      );
    }
  }
}
