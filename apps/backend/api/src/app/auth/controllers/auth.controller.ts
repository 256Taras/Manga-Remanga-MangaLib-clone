import { Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Response } from 'express';

import { IUserRequest } from '../interfaces/user-request.interface';
import { AuthService } from '../services/auth.service';
import JwtAuthGuard from '../guards/jwt-auth.guard';


@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public logIn(@Req() request: IUserRequest, @Res() response: Response): Response<unknown, Record<string, unknown>> {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    return response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  public logOut(@Req() request: IUserRequest, @Res() response: Response): Response<unknown, Record<string, unknown>> {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  public authenticate(@Req() request: IUserRequest) {
    const { user } = request;
    return user;
  }
}
