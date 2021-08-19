
/**
 * Login-register-logout auth interface
 */


export interface IAuthState {

  /**
   * Is user authenticated
   */
  isLoggedIn: boolean | null

  /**
   *  Login-register-logout action status
   */
  isSubmitting: boolean

  /**
   *  Login-register-logout  action error
   */
  validationErrors: string | null




}
