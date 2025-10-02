import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository.port";
import { GetUserDto } from "../dto/getUser.dto";

export class GetUserUseCase{
  constructor (
    private readonly userRepo:UserRepository
  ){}

  async execute(searchInput:GetUserDto): Promise<User | null>{
    let user: User|null = null;
    if(searchInput.criteria === "email"){
      if(searchInput.email){
        user = await this.userRepo.findUserByEmail(searchInput.email);
      }
    }
    if (searchInput.criteria === "id"){
      if(searchInput.userId){
        user = await this.userRepo.findUserById(searchInput.userId);
      }
    }
    if(user === null){
      throw new Error("user not found");
    }
    return user;
  }
}