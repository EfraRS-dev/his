import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { UsersService } from '../../application/services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // POST /users/register
  @Post('register')
  registerUser(@Body() registerDto: any) {
    return { message: 'User registration endpoint' };
  }

  // GET /users/search
  @Get('search')
  queryUsers(@Query() queryDto: any) {
    return { message: 'User search endpoint' };
  }

  // GET /users/:userId
  @Get(':userId')
  getUserById(@Param('userId') userId: string) {
    return { message: `Get user ${userId} endpoint` };
  }
}
