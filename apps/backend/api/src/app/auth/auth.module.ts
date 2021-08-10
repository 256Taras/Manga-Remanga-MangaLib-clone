import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthProviders } from './utils/auth.common';

@Module({
  controllers: [AuthController],
  providers: [...AuthProviders],
})
export class AuthModule {}
