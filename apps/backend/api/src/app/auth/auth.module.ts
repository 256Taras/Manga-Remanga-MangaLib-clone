import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './controllers/auth.controller';
import { AuthProviders } from './utils/auth.common';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './services/local.strategy';
import { JwtStrategy } from './services/jwt-strategy';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [...AuthProviders, LocalStrategy,JwtStrategy]
})
export class AuthModule {
}
