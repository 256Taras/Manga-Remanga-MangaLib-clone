import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { Response } from 'express';

import { IAuthType } from '@manga/utils/shared/interfaces';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { IUserRequest } from '../interfaces/user-request.interface';
import { AuthService } from '../services/auth.service';
import JwtAuthGuard from '../guards/jwt-auth.guard';
import { LoginUserDto } from '../dtos/login-user.dto';
import { environment } from '../../../environments/environment';
import JwtRefreshTokenGuard from '../guards/jwt-refresh-token.guard';
import { RegisterCandidateDto } from '../dtos/register-candidate.dto';


@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }


//TODO - need to refactor, duplicate code
  @HttpCode(201)
  @Post('sign-up')
  public async register(@Body() registrationData: RegisterCandidateDto, @Res({ passthrough: true }) response: Response): Promise<IAuthType> {
    console.log();
    const { refreshJwt, accessJwt } = await this.authService.register(registrationData);

    response.cookie('refreshToken', refreshJwt, {
      httpOnly: true,
      expires: new Date(Date.now() + environment.jwt.expiresInRefreshToken)
    });
    response.cookie('accessToken', accessJwt, {
      httpOnly: false,
      expires: new Date(Date.now() + environment.jwt.accessTokenSecrete)
    });

    response.cookie('jwt', 'test');

    return { message: 'success' };
  }


  //TODO - need to refactor, duplicate code
  @Post('sign-in')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  public async logIn(
    @Body() candidateToUserDto: LoginUserDto,
    @Req() request: IUserRequest,
    @Res({ passthrough: true }) response: Response): Promise<IAuthType> {

    const { refreshJwt, accessJwt } = await this.authService.login(candidateToUserDto);

    response.cookie('refreshToken', refreshJwt, {
      httpOnly: true,
      expires: new Date(Date.now() + environment.jwt.expiresInRefreshToken)
    });
    response.cookie('accessToken', accessJwt, {
      httpOnly: false,
      expires: new Date(Date.now() + environment.jwt.accessTokenSecrete)
    });

    return { message: 'success' };
  }

  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @Post('log-out')
  public logOut(
    @Req() request: IUserRequest,
    @Res() response: Response): { message: string } {
    response.clearCookie('refreshToken');
    response.clearCookie('accessToken');
    return { message: 'success' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth')
  public authenticate(@Req() request: IUserRequest) {
    const { user } = request;

    return { user };
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Get('refresh')
  public async refresh(
    @Req() request: IUserRequest,
    @Res({ passthrough: true }) response: Response
  ) {
    const accessJwt = this.authService.getAccessToken(request.user.id);

    response.cookie('accessToken', accessJwt, {
      httpOnly: false,
      maxAge: environment.jwt.expiresInAccessToken
    });
    return request.user;
  }
}
