import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { ROLE_REPOSITORY } from '../application/tokens';
import { RoleRepository } from '../domain/repositories/role.repository';
import { PrismaService } from '../infrastructure/database/prisma.service';
import { PrismaRoleRepository } from '../infrastructure/database/prisma-role.repository';
import { CreateRoleUseCase } from '../application/use-cases/create-role.use-case';

@Module({
  controllers: [RolesController],
  providers: [
    PrismaService,
    
    // 🎯 Use Cases
    CreateRoleUseCase,
    
    // 📦 Repositorio
    {
      provide: ROLE_REPOSITORY,
      useFactory: (prisma: PrismaService) => new PrismaRoleRepository(prisma),
      inject: [PrismaService],
    },
  ],
  exports: [ROLE_REPOSITORY],
})
export class RolesModule {}