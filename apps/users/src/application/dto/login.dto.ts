import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'admin@hospital.com',
    description: 'User email address',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'admin123', description: 'User password' })
  password: string;
}
