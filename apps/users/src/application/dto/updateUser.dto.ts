import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'UserId for Update',
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: 'Email for Update',
    example: 'nurse.martinez@hospital.com',
  })
  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Username for Update',
    example: 'nurse.martinez',
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    description: 'Password for Update',
    example: 'nurse123',
  })
  @IsString()
  @IsOptional()
  password?: string;
}
