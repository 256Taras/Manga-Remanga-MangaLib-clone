import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';

import { environment } from '../../../environments/environment';
import { UserService } from '../../users/services/user.service';

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
        return request?.cookies?.Authentication;
      }]),
      secretOrKey: environment.jwt.secret
    });
  }

  /**
   * Return validate data
   * @param payload
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async validate(payload: any) {
    return this.userService.findOneById(payload.userId);
  }
}
