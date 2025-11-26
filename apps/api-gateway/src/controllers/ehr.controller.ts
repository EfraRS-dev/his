import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('ehr')
@Controller('ehr')
export class EhrController {
  // 🔹 URL interna del microservicio EHR (Docker)
  private readonly ehrUrl: string;

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.ehrUrl = this.configService.get<string>('EHR_URL')!;
  }

  // 🔹 POST /ehr/antecedent
  @Post('antecedent')
  @ApiOperation({ summary: 'Create a medical antecedent' })
  @ApiBody({
    description: 'Antecedent data',
    schema: {
      type: 'object',
      required: ['type', 'description', 'historyId'],
      properties: {
        type: {
          type: 'string',
          enum: [
            'family',
            'pathological',
            'surgical',
            'allergic',
            'pharmacological',
            'gyneco_obstetric',
          ],
          example: 'allergic',
          description: 'Type of antecedent',
        },
        description: {
          type: 'string',
          example: 'Peanut allergy',
          description: 'Description of the antecedent',
        },
        historyId: {
          type: 'integer',
          example: 10,
          description: 'Medical history ID',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Antecedent created successfully' })
  async createAntecedent(@Body() body: any) {
    const { data } = await this.http.axiosRef.post(
      `${this.ehrUrl}/ehr/antecedent`,
      body,
    );
    return data;
  }

  // 🔹 DELETE /ehr/antecedent/delete/:id
  @Delete('antecedent/delete/:id')
  @ApiOperation({ summary: 'Delete a medical antecedent' })
  @ApiParam({ name: 'id', type: 'number', description: 'Antecedent ID' })
  @ApiResponse({ status: 200, description: 'Antecedent deleted successfully' })
  @ApiResponse({ status: 404, description: 'Antecedent not found' })
  async deleteAntecedent(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.delete(
      `${this.ehrUrl}/ehr/antecedent/delete/${id}`,
    );
    return data;
  }

  // 🔹 PUT /ehr/antecedent/update/:id
  @Put('antecedent/update/:id')
  @ApiOperation({ summary: 'Update a medical antecedent' })
  @ApiParam({ name: 'id', type: 'number', description: 'Antecedent ID' })
  @ApiBody({
    description: 'Updated antecedent data',
    schema: { type: 'object' },
  })
  @ApiResponse({ status: 200, description: 'Antecedent updated successfully' })
  @ApiResponse({ status: 404, description: 'Antecedent not found' })
  async updateAntecedent(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    const { data } = await this.http.axiosRef.put(
      `${this.ehrUrl}/ehr/antecedent/update/${id}`,
      body,
    );
    return data;
  }

  // 🔹 POST /ehr/clinicalEntry
  @Post('clinicalEntry')
  @ApiOperation({ summary: 'Create a clinical entry' })
  @ApiBody({
    description: 'Clinical entry data',
    schema: {
      type: 'object',
      required: [
        'historyId',
        'type',
        'reasonForVisit',
        'diagnosis',
        'doctorId',
      ],
      properties: {
        historyId: {
          type: 'integer',
          example: 10,
          description: 'Medical history ID',
        },
        type: {
          type: 'string',
          enum: ['outpatient', 'emergency', 'hospitalization'],
          example: 'outpatient',
          description: 'Type of clinical entry',
        },
        reasonForVisit: {
          type: 'string',
          example: 'Routine checkup',
          description: 'Reason for the visit',
        },
        diagnosis: {
          type: 'string',
          example: 'Healthy',
          description: 'Diagnosis for the visit',
        },
        notes: {
          type: 'string',
          example: 'Patient requested blood test',
          description: 'Additional notes',
        },
        doctorId: { type: 'integer', example: 5, description: 'Doctor ID' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Clinical entry created successfully',
  })
  async createClinicalEntry(@Body() body: any) {
    const { data } = await this.http.axiosRef.post(
      `${this.ehrUrl}/ehr/clinicalEntry`,
      body,
    );
    return data;
  }

  // 🔹 PUT /ehr/clinicalEntry/update/:id
  @Put('clinicalEntry/update/:id')
  @ApiOperation({ summary: 'Update a clinical entry' })
  @ApiParam({ name: 'id', type: 'number', description: 'Clinical Entry ID' })
  @ApiBody({
    description: 'Updated clinical entry data',
    schema: { type: 'object' },
  })
  @ApiResponse({
    status: 200,
    description: 'Clinical entry updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Clinical entry not found' })
  async updateClinicalEntry(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    const { data } = await this.http.axiosRef.put(
      `${this.ehrUrl}/ehr/clinicalEntry/update/${id}`,
      body,
    );
    return data;
  }

  // 🔹 POST /ehr/:id  → Crear historia clínica
  @Post(':id')
  @ApiOperation({ summary: 'Create medical history for a patient' })
  @ApiParam({ name: 'id', type: 'number', description: 'Patient ID' })
  @ApiResponse({
    status: 201,
    description: 'Medical history created successfully',
  })
  @ApiResponse({ status: 400, description: 'Medical history already exists' })
  async createMedicalHistory(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.post(`${this.ehrUrl}/ehr/${id}`);
    return data;
  }

  // 🔹 PUT /ehr/archive/:id
  @Put('archive/:id')
  @ApiOperation({ summary: 'Archive a medical history' })
  @ApiParam({ name: 'id', type: 'number', description: 'Medical History ID' })
  @ApiResponse({
    status: 200,
    description: 'Medical history archived successfully',
  })
  @ApiResponse({ status: 404, description: 'Medical history not found' })
  async archiveMedicalHistory(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.put(
      `${this.ehrUrl}/ehr/archive/${id}`,
    );
    return data;
  }

  // 🔹 PUT /ehr/unarchive/:id
  @Put('unarchive/:id')
  @ApiOperation({ summary: 'Unarchive a medical history' })
  @ApiParam({ name: 'id', type: 'number', description: 'Medical History ID' })
  @ApiResponse({
    status: 200,
    description: 'Medical history unarchived successfully',
  })
  @ApiResponse({ status: 404, description: 'Medical history not found' })
  async unarchiveMedicalHistory(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.put(
      `${this.ehrUrl}/ehr/unarchive/${id}`,
    );
    return data;
  }

  // 🔹 GET /ehr/:id
  @Get(':id')
  @ApiOperation({ summary: 'Get complete medical history for a patient' })
  @ApiParam({ name: 'id', type: 'number', description: 'Patient ID' })
  @ApiResponse({
    status: 200,
    description:
      'Complete medical history with antecedents and clinical entries',
  })
  @ApiResponse({ status: 404, description: 'Medical history not found' })
  async getMedicalHistory(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.get(`${this.ehrUrl}/ehr/${id}`);
    return data;
  }
}
