import { IAuthType, ISingInRequest, ISingUpRequest } from '@manga/utils/shared/interfaces';
import { api } from '@manga/utils/shared/http';

export class AuthApi {
  static async signIn(userPayload: ISingInRequest): Promise<IAuthType> {
    const { data } = await api.post<IAuthType>('sign-in', userPayload);
    return data;
  }

  static async signUp(candidatePayload: ISingUpRequest): Promise<IAuthType > {
    const { data } = await api.post<IAuthType>('sign-up', candidatePayload);

    return data;

  }

  static async signOut(): Promise<IAuthType> {
    const { data } = await api.post<IAuthType>('sign-out');
    return data;
  }
}
