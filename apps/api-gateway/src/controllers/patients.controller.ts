import { Controller, Get, Post, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Controller('patients')
export class PatientsController {
  private readonly patientUrl = 'http://patients:3000';

  constructor(private readonly http: HttpService) {}

  // 🔹 POST /patients/register
  @Post('register')
  async register(@Body() body: any) {
    const { data } = await this.http.axiosRef.post(`${this.patientUrl}/patients/register`, body);
    return data;
  }

  // 🔹 POST /patients/update/:id
  @Post('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const { data } = await this.http.axiosRef.post(`${this.patientUrl}/patients/update/${id}`, body);
    return data;
  }

  // 🔹 POST /patients/archive/:id
  @Post('archive/:id')
  async archive(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.post(`${this.patientUrl}/patients/archive/${id}`);
    return data;
  }

  // 🔹 GET /patients/document
  @Get('document')
  async getByDocument(@Query() query: any) {
    const { data } = await this.http.axiosRef.get(`${this.patientUrl}/patients/document`, { params: query });
    return data;
  }

  // 🔹 GET /patients/name
  @Get('name')
  async getByName(@Query() query: any) {
    const { data } = await this.http.axiosRef.get(`${this.patientUrl}/patients/name`, { params: query });
    return data;
  }

  // 🔹 GET /patients/triage/:id
  @Get('triage/:id')
  async getTriage(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.get(`${this.patientUrl}/patients/triage/${id}`);
    return data;
  }

  // 🔹 GET /patients/:id
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.get(`${this.patientUrl}/patients/${id}`);
    return data;
  }

  // 🔹 GET /patients/ehr/:id
  @Get('ehr/:id')
  async getEhr(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.get(`${this.patientUrl}/patients/ehr/${id}`);
    return data;
  }
}
