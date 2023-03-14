import { FC } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { FormErrorMessage } from '../../../components/error-message/error-message';
import { FormInput } from '../../../components/input/form-input';
import { LOG_IN_FORM_CONSTANTS } from '../../../constants/authorization-consts/authorization-consts';
import { useHookForm } from '../../../hooks/use-form';
import { AuthorizationFormProperties } from '../../../interfaces/authorization-interfaces/authorization-form-properties';
import styles from './log-in-form.module.css';

const logInFormSchema = z.object({
  nickname: z
    .string()
    .min(3, LOG_IN_FORM_CONSTANTS.S_Nickname)
    .max(20, LOG_IN_FORM_CONSTANTS.L_Nickname),
  password: z.string().min(4, LOG_IN_FORM_CONSTANTS.S_Paswword),
});
type Schema = z.infer<typeof logInFormSchema>;

export const LogInForm: FC<AuthorizationFormProperties> = ({ onSubmit }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit: handleFormSubmit,
    reset,
  } = useHookForm<Schema>({
    schema: logInFormSchema,
  });

  const handleSubmit: SubmitHandler<Schema> = (data) => {
    alert(JSON.stringify(data));
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
        <form onSubmit={handleFormSubmit(handleSubmit)} className={styles.logInForm}>
          <FormInput
            register={register}
            name={'nickname'}
            className={styles.logInFormInput}
            placeholder={'nickname'}
            type={'text'}
          />
          <FormErrorMessage message={errors.nickname?.message} className={styles.errorMessage} />
          <FormInput
            register={register}
            name={'password'}
            className={styles.logInFormInput}
            placeholder={'password'}
            type={'password'}
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
