import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username for registration',
    example: 'Sandro Torres',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Password for registration',
    example: 'sdt123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'RoleId',
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  roleId: number;

  @ApiProperty({
    description: 'Email for registration',
    example: 'dr.smith@hospital.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
