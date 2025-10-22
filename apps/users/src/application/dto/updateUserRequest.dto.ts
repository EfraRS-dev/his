import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"


export class UpdateUserRequestDto{

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    @IsEmail()
    email?: string


    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    username?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    password?: string
}