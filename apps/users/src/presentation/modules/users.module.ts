import { Module } from "@nestjs/common";
import { UsersController } from "../controllers/users.controller";
import { USER_REPOSITORY } from "../../application/tokens";
import { UserRepository } from "../../domain/repositories/user.repository.port";
import { CreateUserUseCase } from "../../application/use-cases/createUser.use-case";
import { GetUserUseCase } from "../../application/use-cases/get-user.use-case";
import { UpdateUserUseCase } from "../../application/use-cases/updateUser.use-case";
import { BlockUserUseCase } from "../../application/use-cases/blockUser.use-case";
import { InactivateUserUseCase } from "../../application/use-cases/inactivateUser.user-case";

@Module({
    controllers: [UsersController],
    providers: [
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
        }
    ]
})
export class UsersModule{}