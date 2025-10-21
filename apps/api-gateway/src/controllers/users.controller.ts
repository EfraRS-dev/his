import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Controller('users')
export class UsersController {
  private readonly usersUrl = 'http://users:3000/users';

  constructor(private readonly http: HttpService) {}

  // 🔹 POST /users/login
  @Post('login')
  async login(@Body() body: any) {
    const { data } = await this.http.axiosRef.post(`${this.usersUrl}/login`, body);
    return data;
  }

  // 🔹 POST /users/activate/:id
  @Post('activate/:id')
  async activate(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.post(`${this.usersUrl}/activate/${id}`);
    return data;
  }

  // 🔹 POST /users/create
  @Post('create')
  async create(@Body() body: any) {
    const { data } = await this.http.axiosRef.post(`${this.usersUrl}/create`, body);
    return data;
  }

  // 🔹 POST /users/update/:id
  @Post('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const { data } = await this.http.axiosRef.post(`${this.usersUrl}/update/${id}`, body);
    return data;
  }

  // 🔹 POST /users/block/:id
  @Post('block/:id')
  async block(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.post(`${this.usersUrl}/block/${id}`);
    return data;
  }

  // 🔹 POST /users/inactivate/:id
  @Post('inactivate/:id')
  async inactivate(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.post(`${this.usersUrl}/inactivate/${id}`);
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
