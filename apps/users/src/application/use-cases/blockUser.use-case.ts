import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository.port";

export class BlockUserUseCase{
    constructor(
        private readonly userRepo:UserRepository
    ){}

    async execute(userId:number): Promise<User>{
        const existingUser = await this.userRepo.findUserById(userId);
        if (existingUser === null){
            throw new Error("Id not found")
        }
        const user = new User(
            existingUser.userId,
            existingUser.username,
            existingUser.passwordHash,
            existingUser.roleId,
            existingUser.email,
            'blocked',
            new Date()
        )
        const updatedUser = await this.userRepo.update(user);
        return updatedUser;
    }

}