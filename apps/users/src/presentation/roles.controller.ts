import { Controller, Get, Param, ParseIntPipe, Inject, Post, Body } from '@nestjs/common';
import { ROLE_REPOSITORY } from '../application/tokens';
import type { RoleRepository } from '../domain/repositories/role.repository';
import { Role } from '../domain/entities/role.entity';
import { CreateRoleDto } from '../application/dto/create-role.dto';
import { CreateRoleUseCase } from '../application/use-cases/create-role.use-case';

@Controller('roles')
export class RolesController {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
    private readonly createRoleUseCase: CreateRoleUseCase,
  ) {}

  // ✅ Crear un rol usando el caso de uso
  @Post()
  async create(@Body() dto: CreateRoleDto): Promise<Role> {
    return this.createRoleUseCase.execute(dto);
  }

  // Listar todos los roles
  @Get()
  async findAll(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }

  // Buscar un rol por ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Role | null> {
    return this.roleRepository.findById(id);
  }
}

