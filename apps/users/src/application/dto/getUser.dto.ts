import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'; 
import { ApiProperty } from '@nestjs/swagger';
import { criterias } from 'apps/users/SwaggerUtility/Names';

export class GetUserDto{

    @ApiProperty({
        description: "Email for searching",
        example: "DunordMaldiceaKeiver123@gmail.com"
    })
    @IsString()
    @IsOptional()
    @IsEmail()
    email?:string
    
    
    @ApiProperty({
        description: "Id for Searching",
        example: 1
    })
    @IsNumber()
    @IsOptional()
    userId?: number
    
    @ApiProperty({
    description: "Password for registration",
    enum: criterias,
    example: criterias.Email,
    })
    @IsString()
    @IsNotEmpty()
    criteria: "email"|"id"

    
}