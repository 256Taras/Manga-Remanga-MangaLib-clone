import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { IPasswordService } from '../interfaces/password-service.interface';
import { PASSWORD_SERVICE } from '../utils/auth.constants';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { UserService } from '../../users/services/user.service';
import { RegisterCandidateDto } from '../dtos/register-candidate.dto';
import { IUser } from '@manga/data-access/shared/interfaces';

enum PostgresErrorCode {
  UniqueViolation = '23505'
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(PASSWORD_SERVICE)
    private readonly passwordService: IPasswordService,
    private readonly userService: UserService
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

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {

    const isPasswordMatching = await this.passwordService.compareHash(plainTextPassword, hashedPassword);

    if (!isPasswordMatching) {

      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);

    }
  }

}


