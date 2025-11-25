import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserRequestDto {
  @ApiPropertyOptional({
    description: 'Email for Update',
    example: 'nurse.brown@hospital.com',
  })
  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Username for Update',
    example: 'nurse.brown',
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({
    description: 'Password for Update',
    example: 'nurse123',
  })
  @IsString()
  @IsOptional()
  password?: string;
}
