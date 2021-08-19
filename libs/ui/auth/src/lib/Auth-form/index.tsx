import React, { FC, memo } from 'react';
import { Formik, Field, Form } from 'formik';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ISingInRequest, ISingUpRequest } from '@manga/utils/shared/interfaces';
import styles from './auth-form.module.scss';

interface IAuthForm {
  isNeedAccount: boolean,
  initialValues: ISingInRequest & ISingUpRequest,
  authStart: (value: ISingUpRequest | ISingInRequest) => void
  setIsNeedAccount: (isNeedAccount: boolean) => void
  validationSchema: unknown,
  isAuthSubmitting: boolean,
  validationErrorsIn: string | null
}


export const InnerForm: FC<IAuthForm> = memo((props) => {

  const {
    isNeedAccount,
    initialValues,
    authStart,
    setIsNeedAccount,
    validationSchema,
    isAuthSubmitting,
    validationErrorsIn
  } = props;

  console.log(isAuthSubmitting);
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          authStart({ ...values });

        }}
      >
        {({ errors, touched, dirty, isValid }) => (
          <Form className={styles.wrapper}>
            <h1>{isNeedAccount ? 'Sing up' : 'Sing in'}</h1>

            <label htmlFor='firstName'>email</label>
            <Field type='email' name='email' />
            {touched.email && errors.email && <div>{errors.email}</div>}


            <label htmlFor='firstName'>password</label>
            <Field type={isNeedAccount ? 'text' : 'password'} name='password' />
            {touched.password && errors.password && <div>{errors.password}</div>}

            {isNeedAccount && <>

              <label htmlFor='username'>First Name</label>
              <Field type='username' name='username' />
              {touched.username && errors.username && <div>{errors.username}</div>}

              <label htmlFor='gender'>password</label>
              <Field type='gender' name='gender' />
              {touched.gender && errors.gender && <div>{errors.gender}</div>}
            </>}
            {validationErrorsIn}
            <input type='checkbox' checked={false} onChange={() => setIsNeedAccount(!isNeedAccount)} />
            <button type='submit' disabled={isAuthSubmitting || !dirty || !isValid}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});


