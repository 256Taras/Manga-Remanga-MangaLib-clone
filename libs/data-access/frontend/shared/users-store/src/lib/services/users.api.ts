import { IUser } from '@manga/utils/shared/interfaces';
import { api } from '@manga/utils/shared/http';

export class UsersApi {
  static async getMe():Promise<Omit<IUser, 'password'>> {
    const { data }  = await api.get<Omit<IUser, 'password'>>('auth');

    return data;
  }
}
