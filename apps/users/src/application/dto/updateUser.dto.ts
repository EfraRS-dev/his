import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"


export class UpdateUserDto{

    @IsNumber()
    @IsNotEmpty()
    userId: number

    @IsString()
    @IsOptional()
    @IsEmail()
    email?: string

    @IsString()
    @IsOptional()
    username?: string

    @IsString()
    @IsOptional()
    password?: string
}