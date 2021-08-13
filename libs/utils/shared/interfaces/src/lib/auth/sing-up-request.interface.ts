
import { ISingInRequest } from './sing-in-request.interface';
import { UserGender } from '../entities/user/user-gender.enum';

export interface ISingUpRequest extends ISingInRequest {
  username: string;
  gender: UserGender;
}
