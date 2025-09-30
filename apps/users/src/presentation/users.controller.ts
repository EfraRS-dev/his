import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { GetUserDto } from '../application/dto/get-user.dto';
import { ManageUserProfileDto } from '../application/dto/manage-user-profile.dto';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { GetUserUseCase } from '../application/use-cases/get-user.use-case';
import { DisableUserUseCase } from '../application/use-cases/disable-user.use-case';
import { ManageUserProfileUseCase } from '../application/use-cases/manage-user-profile.use-case';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,

    @Inject(GetUserUseCase)
    private readonly getUserUseCase: GetUserUseCase,

    @Inject(DisableUserUseCase)
    private readonly disableUserUseCase: DisableUserUseCase,

    @Inject(ManageUserProfileUseCase)
    private readonly manageUserProfileUseCase: ManageUserProfileUseCase,
  ) {}

  // ✅ Crear usuario
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.createUserUseCase.execute(dto);
  }

  // ✅ Obtener usuario por ID
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return this.getUserUseCase.execute({ userId: id } as GetUserDto);
  }

  // ✅ Deshabilitar usuario
  @Post('disable/:id')
  async disableUser(@Param('id', ParseIntPipe) id: number) {
    return this.disableUserUseCase.execute(id);
  }

  // ✅ Actualizar perfil
  @Post('profile/:id')
  async manageProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ManageUserProfileDto,
  ) {
    return this.manageUserProfileUseCase.execute(id, dto);
  }
}

