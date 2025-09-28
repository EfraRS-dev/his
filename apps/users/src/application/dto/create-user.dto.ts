import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsEnum(['Admin', 'Doctor', 'Nurse', 'Patient'], {
    message: 'Role must be one of: Admin, Doctor, Nurse, Patient',
  })
  role: 'Admin' | 'Doctor' | 'Nurse' | 'Patient';

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;
}


