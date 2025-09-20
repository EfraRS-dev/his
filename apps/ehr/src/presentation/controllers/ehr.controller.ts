import { Controller, Get } from '@nestjs/common';
import { EhrService } from './ehr.service';

@Controller()
export class EhrController {
  constructor(private readonly ehrService: EhrService) {}

  @Get()
  getHello(): string {
    return this.ehrService.getHello();
  }
}
