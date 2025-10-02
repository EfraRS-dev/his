import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto{

    @IsNumber()
    @IsNotEmpty()
    roleId: number

    @IsString()
    @IsNotEmpty()
    name: 'Admin' | 'Doctor' | 'Nurse' | 'Patient'

    @IsString()
    @IsOptional()
    permissions?: string []
}