import { UserGender } from '@manga/data-access/shared/interfaces';
import { IsEnum, IsString, Length, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {

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
