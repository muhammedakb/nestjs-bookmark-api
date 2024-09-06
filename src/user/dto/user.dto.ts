import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  firstName?: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
