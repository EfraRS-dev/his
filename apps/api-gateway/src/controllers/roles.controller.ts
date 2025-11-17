import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Controller('roles')
export class RolesController {
  private readonly rolesUrl: string;

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.rolesUrl = this.configService.get<string>('ROLES_URL')!;
  }

  // 🔹 POST /roles/create
  @Post('create')
  async create(@Body() body: any) {
    const { data } = await this.http.axiosRef.post(
      `${this.rolesUrl}/roles/create`,
      body,
    );
    return data;
  }

  // 🔹 GET /roles/find/:id
  @Get('find/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.get(
      `${this.rolesUrl}/roles/find/${id}`,
    );
    return data;
  }
}
