import { IUser } from '@manga/utils/shared/interfaces';

export interface IUserRequest extends Request {
  user: Omit<IUser, 'password'>;
}
