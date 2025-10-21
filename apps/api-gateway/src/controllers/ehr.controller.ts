import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Controller('ehr')
export class EhrController {
  // 🔹 URL interna del microservicio EHR (Docker)
  private readonly ehrUrl = 'http://ehr:3000';

  constructor(private readonly http: HttpService) {}

  // 🔹 POST /ehr/antecedent
  @Post('antecedent')
  async createAntecedent(@Body() body: any) {
    const { data } = await this.http.axiosRef.post(`${this.ehrUrl}/ehr/antecedent`, body);
    return data;
  }

  // 🔹 DELETE /ehr/antecedent/delete/:id
  @Delete('antecedent/delete/:id')
  async deleteAntecedent(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.delete(`${this.ehrUrl}/ehr/antecedent/delete/${id}`);
    return data;
  }

  // 🔹 PUT /ehr/antecedent/update/:id
  @Put('antecedent/update/:id')
  async updateAntecedent(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const { data } = await this.http.axiosRef.put(`${this.ehrUrl}/ehr/antecedent/update/${id}`, body);
    return data;
  }

  // 🔹 POST /ehr/clinicalEntry
  @Post('clinicalEntry')
  async createClinicalEntry(@Body() body: any) {
    const { data } = await this.http.axiosRef.post(`${this.ehrUrl}/ehr/clinicalEntry`, body);
    return data;
  }

  // 🔹 PUT /ehr/clinicalEntry/update/:id
  @Put('clinicalEntry/update/:id')
  async updateClinicalEntry(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const { data } = await this.http.axiosRef.put(`${this.ehrUrl}/ehr/clinicalEntry/update/${id}`, body);
    return data;
  }

  // 🔹 POST /ehr/:id  → Crear historia clínica
  @Post(':id')
  async createMedicalHistory(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.post(`${this.ehrUrl}/ehr/${id}`);
    return data;
  }

  // 🔹 PUT /ehr/archive/:id
  @Put('archive/:id')
  async archiveMedicalHistory(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.put(`${this.ehrUrl}/ehr/archive/${id}`);
    return data;
  }

  // 🔹 PUT /ehr/unarchive/:id
  @Put('unarchive/:id')
  async unarchiveMedicalHistory(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.put(`${this.ehrUrl}/ehr/unarchive/${id}`);
    return data;
  }

  // 🔹 GET /ehr/:id
  @Get(':id')
  async getMedicalHistory(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.get(`${this.ehrUrl}/ehr/${id}`);
    return data;
  }
}
