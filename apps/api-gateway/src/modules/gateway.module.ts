import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PatientsController } from '../controllers/patients.controller';
import { EhrController } from '../controllers/ehr.controller';
import { RolesController } from '../controllers/roles.controller';
import { TriageController } from '../controllers/triage.controller';
import { UsersController } from '../controllers/users.controller';

@Module({
  imports: [HttpModule],
  controllers: [
    PatientsController,
    EhrController,
    RolesController,
    TriageController,
    UsersController,
  ],
})
export class GatewayModule {}
