import { UserGender } from '@manga/utils/shared/interfaces';

export class CreateUserDto {
  public username: string;

  public email: string;

  public password: string;

  public gender: UserGender;
}
