import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsEnum } from 'class-validator';
import { RoleName } from 'apps/users/SwaggerUtility/Names';

export class CreateRoleDto{
@ApiProperty({
    description: "name of the role",
    enum:RoleName,
    example: RoleName.Doctor
})

    @IsString()
    @IsNotEmpty()
    name: 'Admin' | 'Doctor' | 'Nurse' | 'Patient'

    @IsString()
    @IsOptional()
    permissions?: string | null
}