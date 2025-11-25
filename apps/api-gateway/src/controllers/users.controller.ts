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
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('users')
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
  @ApiOperation({ summary: 'User login' })
  @ApiBody({
    description: 'Login credentials',
    schema: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: {
          type: 'string',
          format: 'email',
          example: 'admin@hospital.com',
          description: 'User email address',
        },
        password: {
          type: 'string',
          example: 'admin123',
          description: 'User password',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful, returns JWT token',
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() body: any) {
    const { data } = await this.http.axiosRef.post(
      `${this.usersUrl}/users/login`,
      body,
    );
    return data;
  }

  // 🔹 PUT /users/activate/:id
  @Put('activate/:id')
  @ApiOperation({ summary: 'Activate a user account' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User activated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async activate(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.put(
      `${this.usersUrl}/users/activate/${id}`,
    );
    return data;
  }

  // 🔹 POST /users/create
  @Post('create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    description: 'User creation data',
    schema: {
      type: 'object',
      required: ['username', 'password', 'roleId', 'email'],
      properties: {
        username: {
          type: 'string',
          example: 'Sandro Torres',
          description: 'Username for registration',
        },
        password: {
          type: 'string',
          example: 'sdt123',
          description: 'Password for registration',
        },
        roleId: { type: 'number', example: 2, description: 'Role ID' },
        email: {
          type: 'string',
          format: 'email',
          example: 'dr.smith@hospital.com',
          description: 'Email for registration',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  async create(@Body() body: any) {
    const { data } = await this.http.axiosRef.post(
      `${this.usersUrl}/users/create`,
      body,
    );
    return data;
  }

  // 🔹 PUT /users/update/:id
  @Put('update/:id')
  @ApiOperation({ summary: 'Update user information' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiBody({ description: 'Updated user data', schema: { type: 'object' } })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const { data } = await this.http.axiosRef.put(
      `${this.usersUrl}/users/update/${id}`,
      body,
    );
    return data;
  }

  // 🔹 PUT /users/block/:id
  @Put('block/:id')
  @ApiOperation({ summary: 'Block a user account' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User blocked successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async block(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.put(
      `${this.usersUrl}/users/block/${id}`,
    );
    return data;
  }

  // 🔹 PUT /users/inactivate/:id
  @Put('inactivate/:id')
  @ApiOperation({ summary: 'Inactivate a user account' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User inactivated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async inactivate(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.put(
      `${this.usersUrl}/users/inactivate/${id}`,
    );
    return data;
  }

  // 🔹 GET /users/:id
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User details' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getById(@Param('id', ParseIntPipe) id: number) {
    const { data } = await this.http.axiosRef.get(
      `${this.usersUrl}/users/${id}`,
    );
    return data;
  }

  // 🔹 GET /users/email/:email
  @Get('email/:email')
  @ApiOperation({ summary: 'Get user by email' })
  @ApiParam({
    name: 'email',
    type: 'string',
    description: 'User email address',
  })
  @ApiResponse({ status: 200, description: 'User details' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getByEmail(@Param('email') email: string) {
    const { data } = await this.http.axiosRef.get(
      `${this.usersUrl}/users/email/${email}`,
    );
    return data;
  }
}
