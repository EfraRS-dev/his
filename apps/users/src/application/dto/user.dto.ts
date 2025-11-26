import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    
    @IsNotEmpty()
    @ApiProperty({ example: 'userId' })
    userId: number;

    @IsNotEmpty()
    @ApiProperty({ example: 'user@example.com' })
    email: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'John Doe' })
    username: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'roleId' })
    roleId: number;


        constructor(userId: number, email: string, username: string, roleId: number) {
        this.userId = userId;
        this.email = email;
        this.username = username;
        this.roleId = roleId;
    }
}