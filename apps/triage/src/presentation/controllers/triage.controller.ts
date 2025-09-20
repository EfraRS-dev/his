import { Controller, Get } from '@nestjs/common';
import { TriageService } from '../../application/services/triage.service';

@Controller()
export class TriageController {
  constructor(private readonly triageService: TriageService) {}

  @Get()
  getHello(): string {
    return this.triageService.getHello();
  }
}
