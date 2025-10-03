import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"


export class UpdateUserDto{

    @ApiProperty({
        description: "UserId for Update",
        example: 1
    })
    @IsNumber()
    @IsNotEmpty()
    userId: number
    
    
    @ApiProperty({
        description: "Email for Update",
        example: "DunordMaldiceaKeiver123@gmail.com"
    })
    @IsString()
    @IsOptional()
    @IsEmail()
    email?: string


    @ApiProperty({
        description: "Username for Update",
        example: "DunordMaldiceaKeiver"
    })
    @IsString()
    @IsOptional()
    username?: string

    @ApiProperty({
        description: "Password for Update",
        example: "DunordMaldiceaKeiver123"
    })
    @IsString()
    @IsOptional()
    password?: string
}