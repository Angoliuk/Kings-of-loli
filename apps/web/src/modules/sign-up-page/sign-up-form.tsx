/* eslint-disable @typescript-eslint/no-misused-promises */
import { type FC } from 'react';
import { type SubmitHandler } from 'react-hook-form';

import { FormInput } from '../../components/form-input/form-input';
import { SignUpFormFields } from '../../constants/authorization/authorization';
import { useAuth } from '../../hooks/use-auth';
import { useHookForm } from '../../hooks/use-form';
import { type AuthorizationFormProperties } from '../../interfaces/authorization-form/authorization-form-properties';
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
