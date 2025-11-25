import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum criterias {
  Id = 'id',
  Email = 'email',
}

export class GetUserDto {
  @ApiProperty({
    description: 'Email for searching',
    example: 'nurse.johnson@hospital.com',
  })
  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Id for Searching',
    example: 4,
  })
  @IsNumber()
  @IsOptional()
  userId?: number;

  @ApiProperty({
    description: 'Criteria for searching',
    enum: criterias,
    example: criterias.Email,
  })
  @IsString()
  @IsNotEmpty()
  criteria: 'email' | 'id';
}
