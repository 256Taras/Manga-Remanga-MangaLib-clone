import { PASSWORD_SERVICE } from './auth.constants';
import { PasswordService } from '../services/password.service';
import { UserService } from '../../users/services/user.service';
import { AuthService } from '../services/auth.service';


export const AuthProviders = [
  {
    provide: PASSWORD_SERVICE,
    useClass: PasswordService
  },
  UserService,
  AuthService
];
