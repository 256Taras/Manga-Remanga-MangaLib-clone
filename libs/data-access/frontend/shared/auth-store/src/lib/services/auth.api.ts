import { IAuthResponse, ISingInRequest, ISingUpRequest } from '@manga/utils/shared/interfaces';
import { api } from '@manga/utils/shared/http';

export class AuthApi {
  static async signIn(userPayload: ISingInRequest): Promise<IAuthResponse> {
    const { data } = await api.post<IAuthResponse>('sing-in', userPayload);
    return data;
  }

  static async signUp(candidatePayload: ISingUpRequest): Promise<IAuthResponse> {
    const { data } = await api.post<IAuthResponse>('sing-up', candidatePayload);
    return data;
  }

  static async signOut(): Promise<IAuthResponse> {
    const { data } = await api.post<IAuthResponse>('sing-out');
    return data;
  }
}
