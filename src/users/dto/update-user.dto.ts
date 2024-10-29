import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { UserRole } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(6)
  password?: string;

  @IsEnum(UserRole)
  role?: UserRole;

  @IsBoolean()
  isVerified: true | false;
}
