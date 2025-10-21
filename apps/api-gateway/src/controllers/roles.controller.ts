import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Controller('roles')
export class RolesController {
  private readonly rolesUrl = 'http://users:3000/roles';

  constructor(private readonly http: HttpService) {}

  // 🔹 POST /roles/create
  @Post('create')
  async create(@Body() body: any) {
    const { data } = await this.http.axiosRef.post(`${this.rolesUrl}/create`, body);
    return data;
  }

  // 🔹 GET /roles/find/:id
  @Get('find/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.get(`${this.rolesUrl}/find/${id}`);
    return data;
  }
}
