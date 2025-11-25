import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  ParseIntPipe,
  Put,
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

@ApiTags('patients')
@Controller('patients')
export class PatientsController {
  private readonly patientUrl: string;

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.patientUrl = this.configService.get<string>('PATIENTS_URL')!;
  }

  // 🔹 POST /patients/register
  @Post('register')
  @ApiOperation({ summary: 'Register a new patient' })
  @ApiBody({
    description: 'Patient registration data',
    schema: {
      type: 'object',
      required: [
        'documentType',
        'documentNumber',
        'firstName',
        'lastName',
        'birthDate',
        'gender',
        'address',
        'phone',
        'email',
        'emergencyContact',
      ],
      properties: {
        userId: {
          type: 'integer',
          example: 7,
          description: 'User ID from users microservice',
        },
        documentType: {
          type: 'string',
          example: 'DNI',
          description: 'Document type',
        },
        documentNumber: {
          type: 'string',
          example: '12345678',
          description: 'Document number',
        },
        firstName: {
          type: 'string',
          example: 'John',
          description: 'Patient first name',
        },
        lastName: {
          type: 'string',
          example: 'Doe',
          description: 'Patient last name',
        },
        birthDate: {
          type: 'string',
          format: 'date-time',
          example: '1985-03-15T00:00:00Z',
          description: 'Date of birth',
        },
        gender: {
          type: 'string',
          enum: ['Male', 'Female', 'Other'],
          example: 'Male',
          description: 'Gender',
        },
        address: {
          type: 'string',
          example: '123 Main St, Springfield',
          description: 'Patient address',
        },
        phone: {
          type: 'string',
          example: '+1-555-0101',
          description: 'Phone number',
        },
        email: {
          type: 'string',
          format: 'email',
          example: 'john.doe@email.com',
          description: 'Email address',
        },
        emergencyContact: {
          type: 'string',
          example: '+1-555-0102 (Jane Doe)',
          description: 'Emergency contact',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Patient registered successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  async register(@Body() body: any) {
    const { data } = await this.http.axiosRef.post(
      `${this.patientUrl}/patients/register`,
      body,
    );
    return data;
  }

  // 🔹 POST /patients/update/:id
  @Put('update/:id')
  @ApiOperation({ summary: 'Update patient information' })
  @ApiParam({ name: 'id', type: 'number', description: 'Patient ID' })
  @ApiBody({
    description: 'Updated patient data',
    schema: { type: 'object' },
  })
  @ApiResponse({ status: 200, description: 'Patient updated successfully' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const { data } = await this.http.axiosRef.put(
      `${this.patientUrl}/patients/update/${id}`,
      body,
    );
    return data;
  }

  // 🔹 POST /patients/archive/:id
  @Put('archive/:id')
  @ApiOperation({ summary: 'Archive a patient record' })
  @ApiParam({ name: 'id', type: 'number', description: 'Patient ID' })
  @ApiResponse({ status: 200, description: 'Patient archived successfully' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  async archive(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.put(
      `${this.patientUrl}/patients/archive/${id}`,
    );
    return data;
  }

  // 🔹 GET /patients/document
  @Get('document')
  @ApiOperation({ summary: 'Search patient by document' })
  @ApiQuery({
    name: 'documentType',
    required: true,
    description: 'Document type (e.g., DNI, Passport)',
  })
  @ApiQuery({
    name: 'documentNumber',
    required: true,
    description: 'Document number',
  })
  @ApiResponse({ status: 200, description: 'Patient found' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  async getByDocument(@Query() query: any) {
    const { data } = await this.http.axiosRef.get(
      `${this.patientUrl}/patients/document`,
      { params: query },
    );
    return data;
  }

  // 🔹 GET /patients/name
  @Get('name')
  @ApiOperation({ summary: 'Search patients by name' })
  @ApiQuery({
    name: 'firstName',
    required: false,
    description: 'First name to search',
  })
  @ApiQuery({
    name: 'lastName',
    required: false,
    description: 'Last name to search',
  })
  @ApiResponse({ status: 200, description: 'List of matching patients' })
  async getByName(@Query() query: any) {
    const { data } = await this.http.axiosRef.get(
      `${this.patientUrl}/patients/name`,
      { params: query },
    );
    return data;
  }

  // 🔹 GET /patients/triage/:id
  @Get('triage/:id')
  @ApiOperation({ summary: 'Get patient triage information' })
  @ApiParam({ name: 'id', type: 'number', description: 'Patient ID' })
  @ApiResponse({ status: 200, description: 'Patient triage information' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  async getTriage(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.get(
      `${this.patientUrl}/patients/triage/${id}`,
    );
    return data;
  }

  // 🔹 GET /patients/:id
  @Get(':id')
  @ApiOperation({ summary: 'Get patient by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Patient ID' })
  @ApiResponse({ status: 200, description: 'Patient details' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  async getById(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.get(
      `${this.patientUrl}/patients/${id}`,
    );
    return data;
  }

  // 🔹 GET /patients/ehr/:id
  @Get('ehr/:id')
  @ApiOperation({ summary: 'Get patient electronic health record' })
  @ApiParam({ name: 'id', type: 'number', description: 'Patient ID' })
  @ApiResponse({ status: 200, description: 'Patient EHR' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  async getEhr(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.get(
      `${this.patientUrl}/patients/ehr/${id}`,
    );
    return data;
  }
}
