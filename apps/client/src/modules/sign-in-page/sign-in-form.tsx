/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { FormErrorMessage } from '../../components/error-message/error-message';
import { FormInput } from '../../components/form-input/form-input';
import { SignInFormFields } from '../../constants/authorization/authorization';
import { useHookForm } from '../../hooks/use-form';
import { AuthorizationFormProperties } from '../../interfaces/authorization-form/authorization-form-properties';
import { RoutesEnum } from '../../routes/app-route/app-route-enums';
import { useAuthStore } from '../../store/auth-store/auth-store';
import { trpc } from '../../trpc';
import styles from './sign-in-form.module.css';
import { signInFormSchema, SignInSchema } from './validation';

export const SignInForm: FC<AuthorizationFormProperties> = ({ onSubmit }) => {
  const { data, isError, mutate } = trpc.auth.login.useMutation();
  const signIn = useAuthStore((state) => state.signIn);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit: handleFormSubmit,
    reset,
  } = useHookForm<SignInSchema>({
    schema: signInFormSchema,
  });

  const handleSubmit: SubmitHandler<SignInSchema> = (userInput) => {
    mutate({
      name: userInput.nickname,
      password: userInput.password,
    });
    if (isError) {
      onSubmit();
      reset();
    }
    if (data) {
      signIn(data.access_token, data.user);
      navigate(`${RoutesEnum.Home}`);
    }
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
            className={[styles.signInFormInput, styles.nicknameInput]}
            placeholder={SignInFormFields.NICKNAME_PLACEHOLDER}
            type={SignInFormFields.NICKNAME_TYPE}
          >
            <FormErrorMessage message={errors.nickname?.message} className={styles.errorMessage} />
          </FormInput>
          <FormInput
            register={register}
            name={SignInFormFields.PASSWORD_TYPE}
            className={[styles.signInFormInput, styles.passwordInput]}
            placeholder={SignInFormFields.PASSWORD_PLACEHOLDER}
            type={SignInFormFields.PASSWORD_TYPE}
          >
            <FormErrorMessage message={errors.password?.message} className={styles.errorMessage} />
          </FormInput>
          <button type="submit" disabled={!isValid} className={styles.submit} />
        </form>
      </div>
    </>
  );
};
