import { FC } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { FormErrorMessage } from '../../components/error-message-component';
import { FormInput } from '../../components/form-input-component';
import { SignInFormInputState } from '../../constants/authorization-consts/authorization-consts';
import { useHookForm } from '../../hooks/use-form';
import { AuthorizationFormProperties } from '../../interfaces/authorization-form-interfaces/authorization-form-properties';
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
          <span>log In</span>
        </h1>
        <hr className={styles.signInFormHr} />
        <form onSubmit={() => handleFormSubmit(handleSubmit)} className={styles.signInForm}>
          <FormInput
            register={register}
            name={SignInFormInputState.nicknameType}
            className={styles.signInFormInput}
            placeholder={SignInFormInputState.nicknamePlaceholder}
            type={SignInFormInputState.nicknameType}
          />
          <FormErrorMessage message={errors.nickname?.message} className={styles.errorMessage} />
          <FormInput
            register={register}
            name={SignInFormInputState.passwordType}
            className={styles.signInFormInput}
            placeholder={SignInFormInputState.passwordPlaceholder}
            type={SignInFormInputState.passwordType}
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
