import { Controller, Get, Post, Body, Param, ParseIntPipe, Put } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Controller('users')
export class UsersController {
  private readonly usersUrl = 'http://localhost:3002/users';

  constructor(private readonly http: HttpService) {}

  // 🔹 POST /users/login
  @Post('login')
  async login(@Body() body: any) {
    const { data } = await this.http.axiosRef.post(`${this.usersUrl}/login`, body);
    return data;
  }

  // 🔹 PUT /users/activate/:id
  @Put('activate/:id')
  async activate(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.put(`${this.usersUrl}/activate/${id}`);
    return data;
  }

  // 🔹 POST /users/create
  @Post('create')
  async create(@Body() body: any) {
    const { data } = await this.http.axiosRef.post(`${this.usersUrl}/create`, body);
    return data;
  }

  // 🔹 PUT /users/update/:id
  @Put('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const { data } = await this.http.axiosRef.put(`${this.usersUrl}/update/${id}`, body);
    return data;
  }

  // 🔹 PUT /users/block/:id
  @Put('block/:id')
  async block(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.put(`${this.usersUrl}/block/${id}`);
    return data;
  }

  // 🔹 PUT /users/inactivate/:id
  @Put('inactivate/:id')
  async inactivate(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.put(`${this.usersUrl}/inactivate/${id}`);
    return data;
  }

  // 🔹 GET /users/:id
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.get(`${this.usersUrl}/${id}`);
    return data;
  }

  // 🔹 GET /users/email/:email
  @Get('email/:email')
  async getByEmail(@Param('email') email: string) {
    const { data } = await this.http.axiosRef.get(`${this.usersUrl}/email/${email}`);
    return data;
  }
}
