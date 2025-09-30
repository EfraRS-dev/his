import { Module } from '@nestjs/common';
import { EhrController } from './presentation/controllers/ehr.controller';
import { EhrService } from './application/services/ehr.service';

@Module({
  imports: [],
  controllers: [EhrController],
  providers: [EhrService],
})
export class EhrModule {}
