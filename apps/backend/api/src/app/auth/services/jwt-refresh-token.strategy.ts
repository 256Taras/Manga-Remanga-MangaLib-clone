import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ExtractJwt } from 'passport-jwt';
import { Request } from 'express';

import { environment } from '../../../environments/environment';
import { ITokenPayload } from '../interfaces/token-payload.interface';
import { AuthService } from './auth.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token'
) {
  constructor(
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies['refreshToken'];
      }]),
      secretOrKey: environment.jwt.refreshTokenSecret,
      passReqToCallback: true
    });
  }


  public async validate(request: Request, payload: ITokenPayload) {
    const refreshToken = request.cookies?.Refresh;
    return this.authService.getUserIfRefreshTokenMatches(refreshToken, payload.userId);
  }
}
