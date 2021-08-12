import { IsEmail, Length } from 'class-validator';


export class LoginUserDto {

  @IsEmail()
  public email: string;

  @Length(4, 25)
  public password: string;



}
