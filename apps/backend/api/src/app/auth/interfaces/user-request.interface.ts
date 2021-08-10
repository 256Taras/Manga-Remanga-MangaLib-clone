import { IUser } from '@manga/data-access/shared/interfaces';

export interface IUserRequest extends Request {
  user: Omit<IUser, 'password'>
}
