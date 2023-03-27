import { FC } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { SubmitAuthorizationFormSvg } from '../../../resources/svg/button-svg/submit';
import { FormErrorMessage } from '../../components/error-message-component';
import { FormInput } from '../../components/form-input-component';
import { SignUpFormInputState } from '../../constants/authorization-consts/authorization-consts';
import { useHookForm } from '../../hooks/use-form';
import { AuthorizationFormProperties } from '../../interfaces/authorization-form-interfaces/authorization-form-properties';
import { trpc } from '../../trpc';
import styles from './sign-up-form.module.css';
import { SignUpFormSchema, SignUpSchema } from './validation';

export const SignUpForm: FC<AuthorizationFormProperties> = ({ onSubmit }) => {
  const { mutate } = trpc.auth.register.useMutation();
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
    onSubmit();
    reset();
  };
  return (
    <>
      <div className={styles.signUpBlock}>
        <h1>
          <span>Sign In</span>
        </h1>
        <hr className={styles.signUpFormHr} />
        <form onSubmit={() => handleFormSubmit(handleSubmit)} className={styles.signUpForm}>
          <FormInput
            register={register}
            name={'nickname'}
            className={styles.signUpFormInput}
            placeholder={SignUpFormInputState.nickname}
            type={SignUpFormInputState.nickname}
          />
          <FormErrorMessage message={errors.nickname?.message} className={styles.errorMessage} />
          <FormInput
            register={register}
            name={'password'}
            className={styles.signUpFormInput}
            placeholder={SignUpFormInputState.password}
            type={SignUpFormInputState.password}
          />
          <FormErrorMessage message={errors.password?.message} className={styles.errorMessage} />
          <button type="submit" disabled={!isValid} className={styles.submitButton}>
            <SubmitAuthorizationFormSvg />
          </button>
        </form>
      </div>
    </>
  );
};
