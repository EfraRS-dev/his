import { Inject, Injectable } from "@nestjs/common";
import { Role } from "../../domain/entities/role.entity";
import type { RoleRepository } from "../../domain/repositories/role.repository.port";
import { CreateRoleDto } from "../dto/createRole.dto";
import { ROLE_REPOSITORY } from "../tokens";

@Injectable()
export class CreateRoleUseCase{
    constructor(
       @Inject(ROLE_REPOSITORY) private readonly roleRepo: RoleRepository
    ){}

    async execute(roleInput: CreateRoleDto ): Promise<Role>{
        const existingRole = await this.roleRepo.findRoleById(roleInput.roleId);
        if (existingRole !==null){
            throw new Error('this Role already exists')
        }
        const role = new Role (
            roleInput.roleId,
            roleInput.name,
        );
        return role



    }
}

