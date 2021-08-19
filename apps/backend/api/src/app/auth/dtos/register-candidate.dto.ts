import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { ISingUpRequest, UserGender } from '@manga/utils/shared/interfaces';
import { PartialType } from '@nestjs/mapped-types';
import { LoginUserDto } from './login-user.dto';

export class RegisterCandidateDto
  extends PartialType(LoginUserDto)
  implements ISingUpRequest
{
  @IsString()
  @Length(2, 25)
  public username: string;

  @IsEmail()
  public email: string;

  @Length(4, 25)
  public password: string;

  @IsEnum(UserGender)
  @IsNotEmpty()
  public gender: UserGender;
}
