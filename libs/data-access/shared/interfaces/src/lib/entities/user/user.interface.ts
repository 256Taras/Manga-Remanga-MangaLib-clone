import { UserGender } from './user-gender.enum';

/**
 * interface user
 *@description
 * provides an entity interface user
 */
export interface IUser {

  /**
   * user ID
   */
  id: number;

  /**
   * user name
   */
  username: string;

  /**
   * user email
   */
  email: string;

  /**
   * user hash password
   */
  password: string;

  /**
   * user gender
   */
  gender: UserGender;

  /**
   * user image link URL (option)
   */
  imgUrl?: string;

  /**
   * user is online flag
   */
  isOnline: boolean;

  /**
   * user refresh token (option)
   */
  refreshToken?: string;

  /**
   * user date created
   */
  createdAt: Date;

  /**
   * user last update
   */
  updatedAt: Date;

}
