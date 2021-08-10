import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserProviders } from './utils/users.common';

@Module({
  controllers: [UserController],
  providers: [...UserProviders,]
})
export class UsersModule {}
