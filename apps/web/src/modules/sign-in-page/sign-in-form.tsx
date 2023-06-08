/* eslint-disable @typescript-eslint/no-misused-promises */
import { FormInput } from '@web/components/form-input/form-input';
import { SignInFormFields } from '@web/constants/authorization/authorization';
import { useAuth } from '@web/hooks/use-auth';
import { useHookForm } from '@web/hooks/use-form';
import { type AuthorizationFormProperties } from '@web/interfaces/authorization-form/authorization-form-properties';
import { type FC } from 'react';
import { type SubmitHandler } from 'react-hook-form';

import styles from './sign-in-form.module.css';
import { signInFormSchema, type SignInSchema } from './validation';

export const SignInForm: FC<AuthorizationFormProperties> = ({ onSubmit }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit: handleFormSubmit,
    reset,
  } = useHookForm<SignInSchema>({
    schema: signInFormSchema,
  });
  const { signIn } = useAuth();

  const handleSubmit: SubmitHandler<SignInSchema> = (data) => {
    signIn({ name: data.nickname, password: data.password });
    onSubmit();
    reset();
  };
  return (
    <>
      <div className={styles.signInFormBlock}>
        <span>Sign In</span>
        <form onSubmit={handleFormSubmit(handleSubmit)} className={styles.signInForm}>
          <FormInput
            register={register}
            name={SignInFormFields.NICKNAME_TYPE}
            className={[styles.signInFormInput, styles.nicknameInput]}
            placeholder={SignInFormFields.NICKNAME_PLACEHOLDER}
            type={SignInFormFields.NICKNAME_TYPE}
            error={errors[SignInFormFields.NICKNAME_TYPE]?.message}
          />
          <FormInput
            register={register}
            name={SignInFormFields.PASSWORD_TYPE}
            className={[styles.signInFormInput, styles.passwordInput]}
            placeholder={SignInFormFields.PASSWORD_PLACEHOLDER}
            type={SignInFormFields.PASSWORD_TYPE}
            error={errors[SignInFormFields.PASSWORD_TYPE]?.message}
          />
          <button type="submit" disabled={!isValid} className={styles.submit} />
        </form>
      </div>
    </>
  );
};
