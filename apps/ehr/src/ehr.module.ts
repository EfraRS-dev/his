import { Module } from '@nestjs/common';
import { EhrController } from '../src/presentation/controllers/ehr.controller';
import { EhrService } from '../src/application/services/ehr.service';

@Module({
  imports: [],
  controllers: [EhrController],
  providers: [EhrService],
})
export class EhrModule {}
