import { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { FormErrorMessage } from '../../../components/error-message/error-message';
import { FormInput } from '../../../components/input/form-input';
import { SIGN_UP_FORM_CONSTANTS } from '../../../constants/authorization-consts/authorization-consts';
import { useHookForm } from '../../../hooks/use-form';
import { AuthorizationFormProperties } from '../../../interfaces/authorization-interfaces/authorization-form-properties';
import styles from './sign-in-form.module.css';

const SignUpFormSchema = z.object({
  nickname: z
    .string()
    .min(3, SIGN_UP_FORM_CONSTANTS.S_Nickname)
    .max(20, SIGN_UP_FORM_CONSTANTS.L_Nickname),
  password: z.string().min(4, SIGN_UP_FORM_CONSTANTS.S_Paswword),
});
type Schema = z.infer<typeof SignUpFormSchema>;

export const SignInForm = ({ onSubmit }: AuthorizationFormProperties) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit: handleFormSubmit,
    reset,
  } = useHookForm<Schema>({
    schema: SignUpFormSchema,
  });

  const handleSubmit: SubmitHandler<Schema> = (data) => {
    alert(JSON.stringify(data));
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
            name={'nickname'}
            className={styles.signUpFormInput}
            placeholder={'nickname'}
            type={'text'}
          />
          <FormErrorMessage message={errors.nickname?.message} className={styles.errorMessage} />
          <FormInput
            register={register}
            name={'password'}
            className={styles.signUpFormInput}
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
