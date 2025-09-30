import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: 'Admin' | 'Doctor' | 'Nurse' | 'Patient';

  @IsArray()
  @IsString({ each: true })
  permissions: string[];
}
