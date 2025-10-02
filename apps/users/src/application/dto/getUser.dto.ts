import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUserDto{

    @IsNumber()
    @IsOptional()
    @IsEmail()
    email?:string

    @IsNumber()
    @IsOptional()
    userId?: number

    @IsString()
    @IsNotEmpty()
    criteria: "email"|"id"

    
}