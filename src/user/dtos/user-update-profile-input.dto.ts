import { IsOptional, IsString } from 'class-validator';

export class UserUpdateProfileInput {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsString()
  @IsOptional()
  oldPassword: string;

  @IsString()
  @IsOptional()
  newPassword: string;
}
