import { Module } from '@nestjs/common';
import { TriageController } from './presentation/controllers/triage.controller';
import { TriageService } from './application/services/triage.service';

@Module({
  imports: [],
  controllers: [TriageController],
  providers: [TriageService],
})
export class TriageModule {}
