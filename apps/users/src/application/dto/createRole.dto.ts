import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto{

    @IsString()
    @IsNotEmpty()
    name: 'Admin' | 'Doctor' | 'Nurse' | 'Patient'

    @IsString()
    @IsOptional()
    permissions?: string | null
}