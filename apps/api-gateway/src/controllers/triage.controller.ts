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
  async getHealth() {
    const { data } = await this.http.axiosRef.get(
      `${this.triageUrl}/triage/health`,
    );
    return data;
  }

  // 🔹 GET /triage/stats
  @Get('stats')
  async getStats() {
    const { data } = await this.http.axiosRef.get(
      `${this.triageUrl}/triage/stats`,
    );
    return data;
  }

  // 🔹 GET /triage/queue
  @Get('queue')
  async getQueue(@Query() query: any) {
    const { data } = await this.http.axiosRef.get(
      `${this.triageUrl}/triage/queue`,
      { params: query },
    );
    return data;
  }

  // 🔹 POST /triage
  @Post()
  async create(@Body() body: any) {
    const { data } = await this.http.axiosRef.post(
      `${this.triageUrl}/triage`,
      body,
    );
    return data;
  }

  // 🔹 POST /triage/register
  @Post('register')
  async register(@Body() body: any) {
    const { data } = await this.http.axiosRef.post(
      `${this.triageUrl}/triage/register`,
      body,
    );
    return data;
  }

  // 🔹 GET /triage/:id
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.get(
      `${this.triageUrl}/triage/${id}`,
    );
    return data;
  }

  // 🔹 PATCH /triage/:id
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const { data } = await this.http.axiosRef.patch(
      `${this.triageUrl}/triage/${id}`,
      body,
    );
    return data;
  }

  // 🔹 PATCH /triage/:id/priority
  @Patch(':id/priority')
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
  async delete(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const { data } = await this.http.axiosRef.delete(
      `${this.triageUrl}/triage/${id}`,
      { data: body },
    );
    return data;
  }

  // 🔹 GET /triage/patient/:patientId
  @Get('patient/:patientId')
  async getByPatient(@Param('patientId', ParseIntPipe) patientId: number) {
    const { data } = await this.http.axiosRef.get(
      `${this.triageUrl}/triage/patient/${patientId}`,
    );
    return data;
  }

  // 🔹 GET /triage/patient/:patientId/active
  @Get('patient/:patientId/active')
  async getActive(@Param('patientId', ParseIntPipe) patientId: number) {
    const { data } = await this.http.axiosRef.get(
      `${this.triageUrl}/triage/patient/${patientId}/active`,
    );
    return data;
  }

  // 🔹 POST /triage/:id/vital-signs
  @Post(':id/vital-signs')
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
  async getVitalSignsByTriage(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.get(
      `${this.triageUrl}/triage/${id}/vital-signs`,
    );
    return data;
  }

  // 🔹 GET /triage/vital-signs/:vitalSignsId
  @Get('vital-signs/:vitalSignsId')
  async getVitalSigns(
    @Param('vitalSignsId', ParseIntPipe) vitalSignsId: number,
  ) {
    const { data } = await this.http.axiosRef.get(
      `${this.triageUrl}/triage/vital-signs/${vitalSignsId}`,
    );
    return data;
  }
}
