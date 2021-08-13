import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

import { IUser } from '@manga/utils/shared/interfaces';
import { IPasswordService } from '../interfaces/password-service.interface';
import { PASSWORD_SERVICE } from '../utils/auth.constants';
import { UserService } from '../../users/services/user.service';
import { RegisterCandidateDto } from '../dtos/register-candidate.dto';
import { ITokenPayload } from '../interfaces/token-payload.interface';
import { environment } from '../../../environments/environment';
import { LoginUserDto } from '../dtos/login-user.dto';

enum PostgresErrorCode {
  UniqueViolation = '23505',
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(PASSWORD_SERVICE)
    private readonly passwordService: IPasswordService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * @description - registration of a   for the position user
   */

  public async register(
    candidateData: RegisterCandidateDto
  ): Promise<Omit<IUser, 'password'>> {
    try {
      const hashedPassword = await this.passwordService.getHash(
        candidateData.password
      );

      const createdUser = await this.userService.create({
        ...candidateData,
        password: hashedPassword,
      });

      delete createdUser.password;

      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @param candidate - it's a person who is a candidate for user
   * @description - login candidate
   */
  public async login(
    candidate: LoginUserDto
  ): Promise<{ accessJwt: string; refreshJwt: string; user: IUser }> {
    try {
      const user: IUser = await this.getAuthenticatedUser(
        candidate.email,
        candidate.password
      );

      if (user) {
        const refreshJwt = await this.getRefreshToken(user.id);

        const accessJwt = await this.getAccessToken(user.id);

        await this.setCurrentRefreshToken(refreshJwt, user.id);

        return { accessJwt, refreshJwt, user };
      }
    } catch (e) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   *
   * @param email - user email
   * @param plainTextPassword - hashed password
   * @description - get  authenticated user  based on password
   */
  public async getAuthenticatedUser(
    email: string,
    plainTextPassword: string
  ): Promise<IUser> {
    try {
      const user: IUser = await this.userService.getByEmail(email);

      await this.verifyPassword(plainTextPassword, user.password);

      delete user.password;
      delete user.refreshToken;

      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  /**
   * @param plainTextPassword - candidate  password
   * @param hashedPassword - user  password
   * @description - compare user password and candidate password
   * @return {Promise<void>}
   */
  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<void> {
    const isPasswordMatching = await this.passwordService.compareHash(
      plainTextPassword,
      hashedPassword
    );

    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  /**

   * @param userId - user id
   * @description - get user id return access token
   * @return {Promise<string>}
   */
  public async getAccessToken(userId: number): Promise<string> {
    const payload: ITokenPayload = { userId };
    return this.jwtService.sign(payload, {
      secret: environment.jwt.accessTokenSecrete,
      expiresIn: `${environment.jwt.expiresInAccessToken}m`,
    });
  }

  /**
   *
   * @param userId - user id
   * @description - get user id return refresh token
   * @return {Promise<string>}
   */
  public async getRefreshToken(userId: number): Promise<string> {
    const payload: ITokenPayload = { userId };
    return this.jwtService.sign(payload, {
      secret: environment.jwt.refreshTokenSecret,
      expiresIn: `${environment.jwt.expiresInRefreshToken}d`,
    });
  }

  /**
   *
   * @param refreshToken - user refresh token
   * @param userId - user id
   * @description - set current user hashed refresh token in database
   * @return {Promise<void>}
   */
  public async setCurrentRefreshToken(
    refreshToken: string,
    userId: number
  ): Promise<void> {
    const currentHashedRefreshToken = await this.passwordService.getHash(
      refreshToken
    );
    await this.userService.update(userId, {
      refreshToken: currentHashedRefreshToken,
    });
  }

  /**
   *
   * @param refreshToken - user refresh token
   * @param userId - user id
   * @description - compare candidate  token and user hashed token
   */
  public async getUserIfRefreshTokenMatches(
    refreshToken: string,
    userId: number
  ): Promise<Omit<IUser, 'password'>> {
    const user = await this.userService.findOneById(userId);

    const isRefreshTokenMatching = await this.passwordService.compareHash(
      refreshToken,
      user.refreshToken
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }
}
