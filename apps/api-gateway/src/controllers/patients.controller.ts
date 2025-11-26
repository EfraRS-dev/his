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
  async register(@Body() body: any) {
    const { data } = await this.http.axiosRef.post(
      `${this.patientUrl}/patients/register`,
      body,
    );
    return data;
  }

  // 🔹 POST /patients/update/:id
  @Put('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const { data } = await this.http.axiosRef.put(
      `${this.patientUrl}/patients/update/${id}`,
      body,
    );
    return data;
  }

  // 🔹 PUT /patients/archive/:id
  @Put('archive/:id')
  async archive(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.put(
      `${this.patientUrl}/patients/archive/${id}`,
    );
    return data;
  }

  // 🔹 PUT /patients/unarchive/:id
  @Put('unarchive/:id')
  async unarchive(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.put(
      `${this.patientUrl}/patients/unarchive/${id}`,
    );
    return data;
  }

  // 🔹 GET /patients/document
  @Get('document')
  async getByDocument(@Query() query: any) {
    const { data } = await this.http.axiosRef.get(
      `${this.patientUrl}/patients/document`,
      { params: query },
    );
    return data;
  }

  // 🔹 GET /patients/name
  @Get('name')
  async getByName(@Query() query: any) {
    const { data } = await this.http.axiosRef.get(
      `${this.patientUrl}/patients/name`,
      { params: query },
    );
    return data;
  }

  // 🔹 GET /patients/triage/:id
  @Get('triage/:id')
  async getTriage(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.get(
      `${this.patientUrl}/patients/triage/${id}`,
    );
    return data;
  }

  // 🔹 GET /patients/:id
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.get(
      `${this.patientUrl}/patients/${id}`,
    );
    return data;
  }

  // 🔹 GET /patients/ehr/:id
  @Get('ehr/:id')
  async getEhr(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.get(
      `${this.patientUrl}/patients/ehr/${id}`,
    );
    return data;
  }

  // 🔹 GET /patients
  @Get()
  async getAllPatients(@Query('includeArchived') includeArchived: string) {
    const include = includeArchived === 'true';
    const { data } = await this.http.axiosRef.get(
      `${this.patientUrl}/patients`,
      {
        params: { includeArchived: include },
      }
    );
    return data;
  }
}
