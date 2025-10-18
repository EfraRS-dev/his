import { Module } from "@nestjs/common";
import { UsersController } from "../controllers/users.controller";
import { TOKEN_SERVICE, USER_REPOSITORY } from "../../application/tokens";
import { UserRepository } from "../../domain/repositories/user.repository.port";
import { CreateUserUseCase } from "../../application/use-cases/createUser.use-case";
import { GetUserUseCase } from "../../application/use-cases/get-user.use-case";
import { UpdateUserUseCase } from "../../application/use-cases/updateUser.use-case";
import { BlockUserUseCase } from "../../application/use-cases/blockUser.use-case";
import { InactivateUserUseCase } from "../../application/use-cases/inactivateUser.user-case";
import { PrismaService } from "../../infrastructure/database/prisma.service";
import { PrismaUserRepository } from "../../infrastructure/database/prisma-user.repository";
import { ActivateUserUseCase } from "../../application/use-cases/activateUser.user-case";
import { LoginUseCase } from "../../application/use-cases/login.use-case";
import { TokenServicePort } from "../../domain/repositories/token.repository.port";
import { JwtModule } from "@nestjs/jwt";
import { JwtTokenService } from "../../infrastructure/database/prisma-token.repository";

@Module({
    imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || "EuSecreto", // 👈 Usa tu secret del .env
      signOptions: { expiresIn: '15m' },
    }),
  ],
    controllers: [UsersController],
    providers: [
        PrismaService,

        {
            provide: USER_REPOSITORY,
            useFactory: (prisma: PrismaService) => new PrismaUserRepository(prisma),
            inject: [PrismaService],
        },
        {
            provide: TOKEN_SERVICE,
            useClass: JwtTokenService,
        },

        {
            provide: CreateUserUseCase,
            useFactory: (repo: UserRepository) => new CreateUserUseCase(repo),
            inject: [USER_REPOSITORY]
        },
        {
            provide:GetUserUseCase,
            useFactory: (repo: UserRepository) => new GetUserUseCase(repo),
            inject: [USER_REPOSITORY]
        },
        {
            provide:UpdateUserUseCase,
            useFactory: (repo: UserRepository) => new UpdateUserUseCase(repo),
            inject: [USER_REPOSITORY]
        },
        {
            provide: BlockUserUseCase,
            useFactory: (repo: UserRepository) => new BlockUserUseCase(repo),
            inject: [USER_REPOSITORY]
        },
        {
            provide:InactivateUserUseCase,
            useFactory: (repo: UserRepository) => new InactivateUserUseCase(repo),
            inject: [USER_REPOSITORY]
        },
        {
            provide:ActivateUserUseCase,
            useFactory: (repo: UserRepository) => new ActivateUserUseCase(repo),
            inject: [USER_REPOSITORY]
        },
        {
            provide:LoginUseCase,
            useFactory: (repo: UserRepository,token:TokenServicePort) => new LoginUseCase(repo,token),
            inject: [USER_REPOSITORY,TOKEN_SERVICE]
        },

        

    ]
})
export class UsersModule{}