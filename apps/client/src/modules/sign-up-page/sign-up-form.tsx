/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { FormInput } from '../../components/form-input/form-input';
import { SignUpFormFields } from '../../constants/authorization/authorization';
import { useAuth } from '../../hooks/use-auth';
import { useHookForm } from '../../hooks/use-form';
import { AuthorizationFormProperties } from '../../interfaces/authorization-form/authorization-form-properties';
import styles from './sign-up-form.module.css';
import { SignUpFormSchema, SignUpSchema } from './validation';

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
    signUp(data);
    onSubmit();
    reset();
  };
  return (
    <>
      <div className={styles.signUpBlock}>
        <h1>
          <span>Sign Up</span>
        </h1>
        <hr className={styles.signUpFormHr} />
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
