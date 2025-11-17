import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Controller('users')
export class UsersController {
  private readonly usersUrl: string;

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.usersUrl = this.configService.get<string>('USERS_URL')!;
    console.log(this.usersUrl);
  }

  // 🔹 POST /users/login
  @Post('login')
  async login(@Body() body: any) {
    const { data } = await this.http.axiosRef.post(
      `${this.usersUrl}/users/login`,
      body,
    );
    return data;
  }

  // 🔹 PUT /users/activate/:id
  @Put('activate/:id')
  async activate(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.put(
      `${this.usersUrl}/users/activate/${id}`,
    );
    return data;
  }

  // 🔹 POST /users/create
  @Post('create')
  async create(@Body() body: any) {
    const { data } = await this.http.axiosRef.post(
      `${this.usersUrl}/users/create`,
      body,
    );
    return data;
  }

  // 🔹 PUT /users/update/:id
  @Put('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const { data } = await this.http.axiosRef.put(
      `${this.usersUrl}/users/update/${id}`,
      body,
    );
    return data;
  }

  // 🔹 PUT /users/block/:id
  @Put('block/:id')
  async block(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.put(
      `${this.usersUrl}/users/block/${id}`,
    );
    return data;
  }

  // 🔹 PUT /users/inactivate/:id
  @Put('inactivate/:id')
  async inactivate(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.put(
      `${this.usersUrl}/users/inactivate/${id}`,
    );
    return data;
  }

  // 🔹 GET /users/:id
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.get(
      `${this.usersUrl}/users/${id}`,
    );
    return data;
  }

  // 🔹 GET /users/email/:email
  @Get('email/:email')
  async getByEmail(@Param('email') email: string) {
    const { data } = await this.http.axiosRef.get(
      `${this.usersUrl}/users/email/${email}`,
    );
    return data;
  }
}
