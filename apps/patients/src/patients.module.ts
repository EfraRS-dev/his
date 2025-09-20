import { Module } from '@nestjs/common';
import { PatientsController } from './presentation/controllers/patients.controller';
import { PatientsService } from './application/services/patients.service';

@Module({
  imports: [],
  controllers: [PatientsController],
  providers: [PatientsService],
})
export class PatientsModule {}
