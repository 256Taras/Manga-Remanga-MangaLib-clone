
import { IAuthState } from '../interfaces/auth-state.interface';



export const initialState:IAuthState = {
  isLoggedIn:false,
  isSubmitting:false,
  validationErrors:null
}
