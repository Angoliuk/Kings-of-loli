/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { FormErrorMessage } from '../../components/error-message/error-message';
import { FormInput } from '../../components/form-input/form-input';
import { SignInFormFields } from '../../constants/authorization/authorization';
import { useHookForm } from '../../hooks/use-form';
import { AuthorizationFormProperties } from '../../interfaces/authorization-form/authorization-form-properties';
import { trpc } from '../../trpc';
import styles from './sign-in-form.module.css';
import { signInFormSchema, SignInSchema } from './validation';

export const SignInForm: FC<AuthorizationFormProperties> = ({ onSubmit }) => {
  const { mutate } = trpc.auth.login.useMutation();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit: handleFormSubmit,
    reset,
  } = useHookForm<SignInSchema>({
    schema: signInFormSchema,
  });

  const handleSubmit: SubmitHandler<SignInSchema> = (data) => {
    mutate({
      name: data.nickname,
      password: data.password,
    });
    onSubmit();
    reset();
  };
  return (
    <>
      <div className={styles.signInFormBlock}>
        <h1>
          <span>Sign In</span>
        </h1>
        <hr className={styles.signInFormHr} />
        <form onSubmit={handleFormSubmit(handleSubmit)} className={styles.signInForm}>
          <FormInput
            register={register}
            name={SignInFormFields.NICKNAME_TYPE}
            className={styles.signInFormInput}
            placeholder={SignInFormFields.NICKNAME_PLACEHOLDER}
            type={SignInFormFields.NICKNAME_TYPE}
          />
          <FormErrorMessage message={errors.nickname?.message} className={styles.errorMessage} />
          <FormInput
            register={register}
            name={SignInFormFields.PASSWORD_TYPE}
            className={styles.signInFormInput}
            placeholder={SignInFormFields.PASSWORD_PLACEHOLDER}
            type={SignInFormFields.PASSWORD_TYPE}
          />
          <FormErrorMessage message={errors.password?.message} className={styles.errorMessage} />
          <button type="submit" disabled={!isValid}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
