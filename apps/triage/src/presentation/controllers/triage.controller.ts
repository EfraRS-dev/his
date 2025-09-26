import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { TriageService } from '../../application/services/triage.service';

@Controller('triage')
export class TriageController {
  constructor(private readonly triageService: TriageService) {}

  // GET /triage
  @Get()
  health() {
    return { status: 'Triage service is running' };
  }

  // POST /triage/register
  @Post('register')
  registerTriage(@Body() registerDto: any) {
    return { message: 'Register triage endpoint' };
  }

  // GET /triage/patients/:patientId
  @Get('patients/:patientId')
  getTriageByPatient(@Param('patientId') patientId: string, @Query() queryDto: any) {
    return { message: `Get triage for patient ${patientId} endpoint` };
  }

  // GET /triage/queue
  @Get('queue')
  getPatientsByPriority(@Query() queryDto: any) {
    return { message: 'Get patients by priority queue endpoint' };
  }

  // PUT /triage/:triageId
  @Put(':triageId')
  updateTriage(@Param('triageId') triageId: string, @Body() updateDto: any) {
    return { message: `Update triage ${triageId} endpoint` };
  }

  // GET /triage/:triageId
  @Get(':triageId')
  getTriageById(@Param('triageId') triageId: string) {
    return { message: `Get triage ${triageId} endpoint` };
  }
}
