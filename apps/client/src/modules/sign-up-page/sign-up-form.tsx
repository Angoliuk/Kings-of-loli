/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { FormErrorMessage } from '../../components/error-message/error-message';
import { FormInput } from '../../components/form-input/form-input';
import { SignUpFormFields } from '../../constants/authorization/authorization';
import { useHookForm } from '../../hooks/use-form';
import { AuthorizationFormProperties } from '../../interfaces/authorization-form/authorization-form-properties';
import { RoutesEnum } from '../../routes/app-route/app-route-enums';
import { trpc } from '../../trpc';
import styles from './sign-up-form.module.css';
import { SignUpFormSchema, SignUpSchema } from './validation';

export const SignUpForm: FC<AuthorizationFormProperties> = ({ onSubmit }) => {
  const { isError, mutate } = trpc.auth.register.useMutation();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit: handleFormSubmit,
    reset,
  } = useHookForm<SignUpSchema>({
    schema: SignUpFormSchema,
  });

  const handleSubmit: SubmitHandler<SignUpSchema> = (data) => {
    mutate({
      name: data.nickname,
      password: data.password,
    });
    if (isError) {
      onSubmit();
      reset();
    }
    navigate(`${RoutesEnum.SignIn}`);
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
          >
            <FormErrorMessage message={errors.nickname?.message} className={styles.errorMessage} />
          </FormInput>
          <FormInput
            register={register}
            name={SignUpFormFields.PASSWORD_TYPE}
            className={[styles.signUpFormInput, styles.passwordInput]}
            placeholder={SignUpFormFields.PASSWORD_PLACEHOLDER}
            type={SignUpFormFields.PASSWORD_TYPE}
          >
            <FormErrorMessage message={errors.password?.message} className={styles.errorMessage} />
          </FormInput>
          <button type="submit" disabled={!isValid} className={styles.submit} />
        </form>
      </div>
    </>
  );
};
