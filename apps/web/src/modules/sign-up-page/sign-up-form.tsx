/* eslint-disable @typescript-eslint/no-misused-promises */
import { FormInput } from '@web/components/form-input/form-input';
import { SignUpFormFields } from '@web/constants/authorization/authorization';
import { useAuth } from '@web/hooks/use-auth';
import { useHookForm } from '@web/hooks/use-form';
import { type AuthorizationFormProperties } from '@web/interfaces/authorization-form/authorization-form-properties';
import { type FC } from 'react';
import { type SubmitHandler } from 'react-hook-form';

import styles from './sign-up-form.module.css';
import { SignUpFormSchema, type SignUpSchema } from './validation';

export const SignUpForm: FC<AuthorizationFormProperties> = ({ onSubmit }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit: handleFormSubmit,
    reset,
  } = useHookForm<SignUpSchema>({
    schema: SignUpFormSchema,
  });
  const { signUp } = useAuth();

  const handleSubmit: SubmitHandler<SignUpSchema> = (data) => {
    signUp({ name: data.nickname, password: data.password });
    onSubmit();
    reset();
  };
  return (
    <>
      <div className={styles.signUpBlock}>
        <form onSubmit={handleFormSubmit(handleSubmit)} className={styles.signUpForm}>
          <FormInput
            register={register}
            name={SignUpFormFields.NICKNAME_TYPE}
            className={[styles.signUpFormInput, styles.nicknameInput]}
            placeholder={SignUpFormFields.NICKNAME_PLACEHOLDER}
            type={SignUpFormFields.NICKNAME_TYPE}
            error={errors[SignUpFormFields.NICKNAME_TYPE]?.message}
          />

          <FormInput
            register={register}
            name={SignUpFormFields.PASSWORD_TYPE}
            className={[styles.signUpFormInput, styles.passwordInput]}
            placeholder={SignUpFormFields.PASSWORD_PLACEHOLDER}
            type={SignUpFormFields.PASSWORD_TYPE}
            error={errors[SignUpFormFields.PASSWORD_TYPE]?.message}
          />
          <button type="submit" disabled={!isValid} className={styles.submit} />
        </form>
      </div>
    </>
  );
};
