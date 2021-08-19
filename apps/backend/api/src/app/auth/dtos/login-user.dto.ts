import { IsEmail, Length } from 'class-validator';
import { ISingInRequest } from '@manga/utils/shared/interfaces';



export class LoginUserDto implements ISingInRequest{

  @IsEmail()
  public email: string;

  @Length(4, 25)
  public password: string;


}
