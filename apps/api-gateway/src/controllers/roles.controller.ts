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
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('roles')
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
  @ApiOperation({ summary: 'Create a new role' })
  @ApiBody({
    description: 'Role data',
    schema: {
      type: 'object',
      required: ['name'],
      properties: {
        name: {
          type: 'string',
          enum: ['Admin', 'Doctor', 'Nurse', 'Patient'],
          example: 'Doctor',
          description: 'Name of the role',
        },
        permissions: {
          type: 'string',
          example: 'read,write,diagnose,prescribe',
          description: 'Permissions for the role',
          nullable: true,
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Role created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  async create(@Body() body: any) {
    const { data } = await this.http.axiosRef.post(
      `${this.rolesUrl}/roles/create`,
      body,
    );
    return data;
  }

  // 🔹 GET /roles/find/:id
  @Get('find/:id')
  @ApiOperation({ summary: 'Get role by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Role ID' })
  @ApiResponse({ status: 200, description: 'Role details' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  async findById(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.get(
      `${this.rolesUrl}/roles/find/${id}`,
    );
    return data;
  }
}
