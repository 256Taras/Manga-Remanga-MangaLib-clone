import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';

import { environment } from '../../../environments/environment';
import { UserService } from '../../users/services/user.service';
import { ITokenPayload } from '../interfaces/token-payload.interface';

/**
 * Implements interaction with standard passport-jwt methods
 * and return validate data
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {


  constructor(
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request.cookies.accessToken;
      }]), secretOrKey: environment.jwt.accessTokenSecrete
    });
  }

  /**
   * Return validate data
   * @param payload
   */
  public async validate(payload: ITokenPayload) {
    console.log(payload);
    return this.userService.findOneById(payload.userId);
  }
}
