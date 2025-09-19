import { Module } from '@nestjs/common';
import { EhrController } from './ehr.controller';
import { EhrService } from './ehr.service';

@Module({
  imports: [],
  controllers: [EhrController],
  providers: [EhrService],
})
export class EhrModule {}
