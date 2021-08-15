import React, { FC, useState } from 'react';
import { useAuthFacade } from '@manga/data-access/frontend/shared/auth-store';

const AuthFeature: FC = () => {
  const [isRegister, setIsRegister] = useState<boolean>();
  const { signUp, signOut, signIn, isLoggedIn, validationErrorsIn, isSubmitting } = useAuthFacade();
  return (
    <div>
      <div className='modal'>

      </div>

    </div>
  );
};

export default AuthFeature;
