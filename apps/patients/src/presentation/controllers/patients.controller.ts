import { Controller, Get } from '@nestjs/common';
import { PatientsService } from '../../application/services/patient.service';

@Controller()
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  getHello(): string {
    return this.patientsService.getHello();
  }
}
