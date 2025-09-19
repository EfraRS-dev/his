import { Module } from '@nestjs/common';
import { TriageController } from './triage.controller';
import { TriageService } from './triage.service';

@Module({
  imports: [],
  controllers: [TriageController],
  providers: [TriageService],
})
export class TriageModule {}
