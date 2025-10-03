import { Controller, Get, Post, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { CreateRoleDto } from '../../application/dto/createRole.dto';
import { CreateRoleUseCase } from '../../application/use-cases/createRole.use-case';
import { GetRoleUseCase } from '../../application/use-cases/getRole.use-case';

@Controller ("roles")
export class RolesController{
    constructor(
        private readonly createRole: CreateRoleUseCase,
        private readonly getRole: GetRoleUseCase
    ){}
    
    @Post('/create')
    async create(@Body() body:CreateRoleDto){
        const role = await this.createRole.execute({
            name: body.name
        })
        return role;
    
}
    @Get ("/find/:id")
    async findRoleById(@Param("id", ParseIntPipe) id:number){
        const role = await this.getRole.execute(id)
        return role
    }
}

