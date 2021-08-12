import { Connection } from 'typeorm';

import { USER_REPOSITORY } from './user.constants';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

export const UserProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [Connection],
  },
  UserService
];
