import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('triage')
@Controller('triage')
export class TriageController {
  private readonly triageUrl: string;

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.triageUrl = this.configService.get<string>('TRIAGE_URL')!;
  }

  // 🔹 GET /triage/health
  @Get('health')
  @ApiOperation({ summary: 'Check triage service health status' })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  async getHealth() {
    const { data } = await this.http.axiosRef.get(
      `${this.triageUrl}/triage/health`,
    );
    return data;
  }

  // 🔹 GET /triage/stats
  @Get('stats')
  @ApiOperation({ summary: 'Get triage statistics' })
  @ApiResponse({
    status: 200,
    description: 'Triage statistics by urgency level',
  })
  async getStats() {
    const { data } = await this.http.axiosRef.get(
      `${this.triageUrl}/triage/stats`,
    );
    return data;
  }

  // 🔹 GET /triage/queue
  @Get('queue')
  @ApiOperation({ summary: 'Get patient queue by priority' })
  @ApiQuery({
    name: 'urgencyLevel',
    required: false,
    description: 'Filter by urgency level (1-5)',
  })
  @ApiResponse({ status: 200, description: 'List of patients in triage queue' })
  async getQueue(@Query() query: any) {
    const { data } = await this.http.axiosRef.get(
      `${this.triageUrl}/triage/queue`,
      { params: query },
    );
    return data;
  }

  // 🔹 POST /triage
  @Post()
  @ApiOperation({ summary: 'Create a new triage entry' })
  @ApiBody({ description: 'Triage data', schema: { type: 'object' } })
  @ApiResponse({ status: 201, description: 'Triage created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  async create(@Body() body: any) {
    const { data } = await this.http.axiosRef.post(
      `${this.triageUrl}/triage`,
      body,
    );
    return data;
  }

  // 🔹 POST /triage/register
  @Post('register')
  @ApiOperation({ summary: 'Register complete triage with vital signs' })
  @ApiBody({
    description: 'Complete triage registration data',
    schema: {
      type: 'object',
      properties: {
        patientId: { type: 'number', example: 1 },
        nurseId: { type: 'number', example: 2 },
        urgencyLevel: { type: 'number', example: 3, minimum: 1, maximum: 5 },
        initialObservations: {
          type: 'string',
          example: 'Patient complaints of chest pain',
        },
        vitalSigns: {
          type: 'object',
          properties: {
            temperature: { type: 'number', example: 37.5 },
            bloodPressure: { type: 'string', example: '120/80' },
            heartRate: { type: 'number', example: 75 },
            respiratoryRate: { type: 'number', example: 16 },
            oxygenSaturation: { type: 'number', example: 98 },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Triage registered successfully with vital signs',
  })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  async register(@Body() body: any) {
    const { data } = await this.http.axiosRef.post(
      `${this.triageUrl}/triage/register`,
      body,
    );
    return data;
  }

  // 🔹 GET /triage/:id
  @Get(':id')
  @ApiOperation({ summary: 'Get triage by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Triage ID' })
  @ApiResponse({ status: 200, description: 'Triage details' })
  @ApiResponse({ status: 404, description: 'Triage not found' })
  async getById(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.get(
      `${this.triageUrl}/triage/${id}`,
    );
    return data;
  }

  // 🔹 PATCH /triage/:id
  @Patch(':id')
  @ApiOperation({ summary: 'Update triage information' })
  @ApiParam({ name: 'id', type: 'number', description: 'Triage ID' })
  @ApiBody({ description: 'Updated triage data', schema: { type: 'object' } })
  @ApiResponse({ status: 200, description: 'Triage updated successfully' })
  @ApiResponse({ status: 404, description: 'Triage not found' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const { data } = await this.http.axiosRef.patch(
      `${this.triageUrl}/triage/${id}`,
      body,
    );
    return data;
  }

  // 🔹 PATCH /triage/:id/priority
  @Patch(':id/priority')
  @ApiOperation({ summary: 'Update triage priority/urgency level' })
  @ApiParam({ name: 'id', type: 'number', description: 'Triage ID' })
  @ApiBody({
    description: 'Priority update data',
    schema: {
      type: 'object',
      properties: {
        urgencyLevel: { type: 'number', example: 1, minimum: 1, maximum: 5 },
        reason: { type: 'string', example: 'Patient condition worsened' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Priority updated successfully' })
  @ApiResponse({ status: 404, description: 'Triage not found' })
  async updatePriority(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    const { data } = await this.http.axiosRef.patch(
      `${this.triageUrl}/triage/${id}/priority`,
      body,
    );
    return data;
  }

  // 🔹 DELETE /triage/:id
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a triage entry' })
  @ApiParam({ name: 'id', type: 'number', description: 'Triage ID' })
  @ApiBody({
    description: 'Deletion reason',
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'number', example: 1 },
        reason: { type: 'string', example: 'Duplicate entry' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Triage deleted successfully' })
  @ApiResponse({ status: 404, description: 'Triage not found' })
  async delete(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const { data } = await this.http.axiosRef.delete(
      `${this.triageUrl}/triage/${id}`,
      { data: body },
    );
    return data;
  }

  // 🔹 GET /triage/patient/:patientId
  @Get('patient/:patientId')
  @ApiOperation({ summary: 'Get all triage entries for a patient' })
  @ApiParam({ name: 'patientId', type: 'number', description: 'Patient ID' })
  @ApiResponse({ status: 200, description: 'List of patient triage entries' })
  async getByPatient(@Param('patientId', ParseIntPipe) patientId: number) {
    const { data } = await this.http.axiosRef.get(
      `${this.triageUrl}/triage/patient/${patientId}`,
    );
    return data;
  }

  // 🔹 GET /triage/patient/:patientId/active
  @Get('patient/:patientId/active')
  @ApiOperation({ summary: 'Get active triage for a patient' })
  @ApiParam({ name: 'patientId', type: 'number', description: 'Patient ID' })
  @ApiResponse({ status: 200, description: 'Active triage entry' })
  @ApiResponse({ status: 404, description: 'No active triage found' })
  async getActive(@Param('patientId', ParseIntPipe) patientId: number) {
    const { data } = await this.http.axiosRef.get(
      `${this.triageUrl}/triage/patient/${patientId}/active`,
    );
    return data;
  }

  // 🔹 POST /triage/:id/vital-signs
  @Post(':id/vital-signs')
  @ApiOperation({ summary: 'Add vital signs to a triage' })
  @ApiParam({ name: 'id', type: 'number', description: 'Triage ID' })
  @ApiBody({
    description: 'Vital signs data',
    schema: {
      type: 'object',
      required: [
        'temperature',
        'bloodPressure',
        'heartRate',
        'respiratoryRate',
        'oxygenSaturation',
      ],
      properties: {
        temperature: {
          type: 'number',
          example: 37.4,
          description: 'Body temperature in degrees Celsius',
        },
        bloodPressure: {
          type: 'string',
          pattern: '^\\d{2,3}/\\d{2,3}$',
          example: '125/82',
          description: 'Blood pressure reading in format systolic/diastolic',
        },
        heartRate: {
          type: 'integer',
          minimum: 30,
          maximum: 250,
          example: 84,
          description: 'Heart rate in beats per minute',
        },
        respiratoryRate: {
          type: 'integer',
          example: 18,
          description: 'Respiratory rate in breaths per minute',
        },
        oxygenSaturation: {
          type: 'integer',
          example: 97,
          description: 'Oxygen saturation percentage',
        },
        additionalNotes: {
          type: 'string',
          maxLength: 500,
          example: 'Sin antecedentes relevantes.',
          description: 'Additional notes about vital signs measurement',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Vital signs added successfully' })
  @ApiResponse({ status: 404, description: 'Triage not found' })
  async addVitalSigns(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    const { data } = await this.http.axiosRef.post(
      `${this.triageUrl}/triage/${id}/vital-signs`,
      body,
    );
    return data;
  }

  // 🔹 GET /triage/:id/vital-signs
  @Get(':id/vital-signs')
  @ApiOperation({ summary: 'Get all vital signs for a triage' })
  @ApiParam({ name: 'id', type: 'number', description: 'Triage ID' })
  @ApiResponse({ status: 200, description: 'List of vital signs' })
  async getVitalSignsByTriage(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.get(
      `${this.triageUrl}/triage/${id}/vital-signs`,
    );
    return data;
  }

  // 🔹 GET /triage/vital-signs/:vitalSignsId
  @Get('vital-signs/:vitalSignsId')
  @ApiOperation({ summary: 'Get specific vital signs by ID' })
  @ApiParam({
    name: 'vitalSignsId',
    type: 'number',
    description: 'Vital Signs ID',
  })
  @ApiResponse({ status: 200, description: 'Vital signs details' })
  @ApiResponse({ status: 404, description: 'Vital signs not found' })
  async getVitalSigns(
    @Param('vitalSignsId', ParseIntPipe) vitalSignsId: number,
  ) {
    const { data } = await this.http.axiosRef.get(
      `${this.triageUrl}/triage/vital-signs/${vitalSignsId}`,
    );
    return data;
  }
}
