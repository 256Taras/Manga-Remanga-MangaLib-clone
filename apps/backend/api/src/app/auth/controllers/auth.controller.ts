import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { LocalAuthGuard } from '../guards/local-auth.guard';
import { IUserRequest } from '../interfaces/user-request.interface';
import { AuthService } from '../services/auth.service';
import JwtAuthGuard from '../guards/jwt-auth.guard';
import { CreateUserDto } from '../../users/dtos/create-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { environment } from '../../../environments/environment';
import JwtRefreshTokenGuard from '../guards/jwt-refresh-token.guard';
import { IUser } from '@manga/utils/shared/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(201)
  @Post('register')
  public register(@Body() registrationData: CreateUserDto) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async logIn(
    @Body() candidateToUserDto: LoginUserDto,
    @Req() request: IUserRequest,
    @Res({ passthrough: true }) response: Response
  ): Promise<Omit<IUser, 'password'>> {
    const { refreshJwt, accessJwt, user } = await this.authService.login(
      candidateToUserDto
    );

    response.cookie('refreshToken', refreshJwt, {
      httpOnly: true,
      maxAge: environment.jwt.expiresInRefreshToken,
    });
    response.cookie('accessToken', accessJwt, {
      httpOnly: false,
      maxAge: environment.jwt.expiresInAccessToken,
    });

    return user;
  }

  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  public logOut(
    @Req() request: IUserRequest,
    @Res() response: Response
  ): { message: string } {
    response.clearCookie('refreshToken');
    response.clearCookie('accessToken');
    return { message: 'success' };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  public authenticate(@Req() request: IUserRequest) {
    const { user } = request;
    return user;
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
      maxAge: environment.jwt.expiresInAccessToken,
    });
    return request.user;
  }
}
