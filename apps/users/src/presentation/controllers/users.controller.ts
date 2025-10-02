import { Controller, Get, Post, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from '../../application/dto/createUser.dto';
import { GetUserDto } from '../../application/dto/getUser.dto';
import { UpdateUserDto } from '../../application/dto/updateUser.dto';
import { CreateUserUseCase } from '../../application/use-cases/createUser.use-case';
import { GetUserUseCase } from '../../application/use-cases/get-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/updateUser.use-case';
import { BlockUserUseCase } from '../../application/use-cases/blockUser.use-case';
import { InactivateUserUseCase } from '../../application/use-cases/inactivateUser.user-case';

@Controller('users')
export class UsersController{
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly getUser: GetUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly blockUser: BlockUserUseCase,
    private readonly inactivateUser: InactivateUserUseCase
  ){}

  @Post('/create')
  async create(@Body() body: CreateUserDto){
    const user = await this.createUser.execute({
      username: body.username,
      password: body.password,
      roleId: body.roleId,
      email: body.email
    })
    return user;
  }

  @Post('/update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto){
    const updatedUser = await this.updateUser.execute({
      userId: id,
      email: body.email,
      username: body.username,
      password: body.password
    })
    return updatedUser;
  }

  @Post('/block/:id')
  async BlockUserById(@Param('id', ParseIntPipe) id: number){
    const blockedUser = await this.blockUser.execute(id)
    return blockedUser
  }

  @Post('/inactivate/:id')
  async InactivateUserById(@Param('id', ParseIntPipe) id: number){
    const inactivatedUser = await this.inactivateUser.execute(id)
    return inactivatedUser
  }

  @Get('/:id')
  async GetUserById(@Param('id', ParseIntPipe) id: number){
    const user = await this.getUser.execute({
      userId: id,
      criteria: 'id'
    })
  }

  @Get('/email')
  async GetUserByEmail(@Query() query: GetUserDto){
    const user = await this.getUser.execute({
      email: query.email,
      criteria: 'email'
    })
  }
}
