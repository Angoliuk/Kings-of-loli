import { FC } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { FormErrorMessage } from '../../components/error-message-component';
import { FormInput } from '../../components/form-input-component';
import { LogInFormInputState } from '../../constants/authorization-consts/authorization-consts';
import { useHookForm } from '../../hooks/use-form';
import { AuthorizationFormProperties } from '../../interfaces/authorization-form-interfaces/authorization-form-properties';
import { trpc } from '../../trpc';
import styles from './log-in-form.module.css';
import { logInFormSchema } from './validation';

type Schema = z.infer<typeof logInFormSchema>;

export const LogInForm: FC<AuthorizationFormProperties> = ({ onSubmit }) => {
  const { mutate } = trpc.auth.login.useMutation();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit: handleFormSubmit,
    reset,
  } = useHookForm<Schema>({
    schema: logInFormSchema,
  });

  const handleSubmit: SubmitHandler<Schema> = (data) => {
    mutate({
      name: data.nickname,
      password: data.password,
    });
    onSubmit();
    reset();
  };
  return (
    <>
      <div className={styles.logInFormBlock}>
        <h1>
          <span>log In</span>
        </h1>
        <hr className={styles.logInFormHr} />
        <form onSubmit={() => handleFormSubmit(handleSubmit)} className={styles.logInForm}>
          <FormInput
            register={register}
            name={'nickname'}
            className={styles.logInFormInput}
            placeholder={LogInFormInputState.nickname}
            type={LogInFormInputState.nickname}
          />
          <FormErrorMessage message={errors.nickname?.message} className={styles.errorMessage} />
          <FormInput
            register={register}
            name={'password'}
            className={styles.logInFormInput}
            placeholder={LogInFormInputState.password}
            type={LogInFormInputState.password}
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
