import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

import { IUser } from '@manga/data-access/shared/interfaces';
import { IPasswordService } from '../interfaces/password-service.interface';
import { PASSWORD_SERVICE } from '../utils/auth.constants';
import { UserService } from '../../users/services/user.service';
import { RegisterCandidateDto } from '../dtos/register-candidate.dto';
import { ITokenPayload } from '../interfaces/token-payload.interface';
import { environment } from '../../../environments/environment';

enum PostgresErrorCode {
  UniqueViolation = '23505'
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(PASSWORD_SERVICE)
    private readonly passwordService: IPasswordService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {
  }

  public async register(candidateData: RegisterCandidateDto): Promise<Omit<IUser, 'password'>> {
    try {

      const hashedPassword = await this.passwordService.getHash(candidateData.password);

      const createdUser = await this.userService.create({ ...candidateData, password: hashedPassword });

      delete createdUser.password;

      return createdUser;


    } catch (error) {

      if (error?.code === PostgresErrorCode.UniqueViolation) {

        throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);

      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }

  /**
   *
   * @param email - user email
   * @param plainTextPassword - hashed password
   */
  public async getAuthenticatedUser(email: string, plainTextPassword: string): Promise<IUser> {
    try {

      const user: IUser = await this.userService.getByEmail(email);

      /**
       * if hash password and user password int match then error
       */
      await this.verifyPassword(plainTextPassword, user.password);

      delete user.password;

      return user;

    } catch (error) {

      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string): Promise<void> {

    const isPasswordMatching = await this.passwordService.compareHash(plainTextPassword, hashedPassword);

    if (!isPasswordMatching) {

      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);

    }
  }

  public getCookieWithJwtToken(userId: number): string {

    const payload: ITokenPayload = { userId };

    const token = this.jwtService.sign(payload);

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${environment.jwt.expiresIn}`;
  }

  public getCookieForLogOut(): string {

    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;

  }
}




