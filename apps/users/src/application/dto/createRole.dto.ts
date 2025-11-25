import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum RoleName {
  Doctor = 'Doctor',
  Admin = 'Admin',
  Patient = 'Patient',
  Nurse = 'Nurse',
}

export class CreateRoleDto {
  @ApiProperty({
    description: 'name of the role',
    enum: RoleName,
    example: RoleName.Doctor,
  })
  @IsString()
  @IsNotEmpty()
  name: 'Admin' | 'Doctor' | 'Nurse' | 'Patient';

  @ApiProperty({
    description: 'Permissions for the role',
    example: 'read,write,diagnose,prescribe',
    required: false,
  })
  @IsString()
  @IsOptional()
  permissions?: string | null;
}
