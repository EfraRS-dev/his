import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetUserDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsNotEmpty()
  @IsString()
  criteria: "name"|"id";
}
