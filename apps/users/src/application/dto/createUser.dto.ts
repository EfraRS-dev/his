import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
    
    @ApiProperty({
        description: "Username for registration",
        example: "DunordMaldiceaKeiver"
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: "Password for registration",
        example: "DunordMaldiceaKeiver123"
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: "RoleId",
        example: 1
    })
    @IsNumber()
    @IsNotEmpty()
    roleId: number;

    @ApiProperty({
        description: "Email for registration",
        example: "DunordMaldiceaKeiver123@gmail.com"
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}