import { User } from "../../domain/entities/user.entity";
import { UserDto } from "../dto/user.dto";

export const toUserDTO = (user:User): UserDto => new UserDto(
    user.userId ?? 0,
    user.email,
    user.username,
    user.roleId
)