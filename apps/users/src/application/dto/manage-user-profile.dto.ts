import { IsEmail, IsOptional, IsString } from 'class-validator';

export class ManageUserProfileDto {
  @IsString()
  userId: string; // Usuario a actualizar

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

