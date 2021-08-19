import React, { FC, useEffect, useState } from 'react';
import * as yup from 'yup';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { useAuthFacade } from '@manga/data-access/frontend/shared/auth-store';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { InnerForm } from '@manga/ui/auth';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {  ISingUpRequest, UserGender } from '@manga/utils/shared/interfaces';
import { useUsersFacade } from '@manga/data-access/frontend/shared/users-store';


const signInValidation = {
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string()
    .min(4, 'Password too Short!')
    .max(25, 'Password too Long!')
    .required('Required')
};

const signUpValidation = {
  ...signInValidation,
  username: yup.string()
    .min(4, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  gender: yup.string()
    .required('Required')
};

const signInInitialValues = {
  email: '',
  password: ''
};

const signUpInitialValues: ISingUpRequest = {
  ...signInInitialValues,
  username: '',
  gender: UserGender.NOT_SPECIFY
};

const signInSchema = yup.object().shape(signInValidation);


const signUpSchema = yup.object().shape(signUpValidation);


export const AuthFeature: FC = () => {
  /**
   * Flag the show login  or register form
   */
  const [isNeedAccount, setIsNeedAccount] = useState<boolean>(true);


  const { signIn, signUp, isSubmitting, isLoggedIn, validationErrorsIn } = useAuthFacade();
  const { user, getUserData } = useUsersFacade();
  console.log(user);

  useEffect(() => {
    console.log('im work useEffect');
    if (isLoggedIn && !user) {
      console.log('im work');
      getUserData();
    }
  }, [getUserData, isLoggedIn, user]);


  /**
   * Props for dump component
   */
  const initialValues = isNeedAccount ? signUpInitialValues : signInInitialValues;
  const validationSchema = isNeedAccount ? signUpSchema : signInSchema;
  const authStart = isNeedAccount ? signUp : signIn;


  return (
    <InnerForm validationErrorsIn={validationErrorsIn}
                 isAuthSubmitting={isSubmitting}
                 isNeedAccount={isNeedAccount}
                 setIsNeedAccount={setIsNeedAccount}
                 validationSchema={validationSchema}
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        // @ts-ignore
                 authStart={authStart}
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        // @ts-ignore
                 initialValues={initialValues} />
  );
};


