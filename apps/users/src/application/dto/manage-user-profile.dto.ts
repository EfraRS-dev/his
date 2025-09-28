import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class ManageUserProfileDto {
  @IsNumber()
  userId: number; // Usuario a actualizar

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  roleId?: string; // Se permite cambiar el rol
}

