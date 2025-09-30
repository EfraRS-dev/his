import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { GetUserUseCase } from '../application/use-cases/get-user.use-case';
import { DisableUserUseCase } from '../application/use-cases/disable-user.use-case';
import { ManageUserProfileUseCase } from '../application/use-cases/manage-user-profile.use-case';
import { USER_REPOSITORY, ROLE_REPOSITORY } from '../application/tokens';
import { UserRepository } from '../domain/repositories/user.repository';
import { RoleRepository } from '../domain/repositories/role.repository';
import { PrismaService } from '../infrastructure/database/prisma.service';
import { PrismaUserRepository } from '../infrastructure/database/prisma-user.repository';
import { PrismaRoleRepository } from '../infrastructure/database/prisma-role.repository';

@Module({
  controllers: [UsersController],
  providers: [
    PrismaService,

    // Repositorios
    {
      provide: USER_REPOSITORY,
      useFactory: (prisma: PrismaService) => new PrismaUserRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: ROLE_REPOSITORY,
      useFactory: (prisma: PrismaService) => new PrismaRoleRepository(prisma),
      inject: [PrismaService],
    },

    // Casos de uso
    {
      provide: CreateUserUseCase,
      useFactory: (
        userRepo: UserRepository,
        roleRepo: RoleRepository,
      ) => new CreateUserUseCase(userRepo, roleRepo),
      inject: [USER_REPOSITORY, ROLE_REPOSITORY],
    },
    {
      provide: GetUserUseCase,
      useFactory: (repo: UserRepository) => new GetUserUseCase(repo),
      inject: [USER_REPOSITORY],
    },
    {
      provide: DisableUserUseCase,
      useFactory: (repo: UserRepository) => new DisableUserUseCase(repo),
      inject: [USER_REPOSITORY],
    },
    {
      provide: ManageUserProfileUseCase,
      useFactory: (repo: UserRepository) => new ManageUserProfileUseCase(repo),
      inject: [USER_REPOSITORY],
    },
  ],
})
export class UsersModule {}



