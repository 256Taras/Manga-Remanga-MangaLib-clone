
/**
 * Login-register-logout auth interface
 */


import { IUser } from '@manga/utils/shared/interfaces';

/**
 * User-state interface
 */
export interface IUsersState {
  /**
   * User entity
   */
  user: Omit<IUser, 'password'> | null

  /**
   * User load status
   */
  userLoadRun: boolean

  /**
   * User load error
   */
  userLoadFailure: string | null
}
