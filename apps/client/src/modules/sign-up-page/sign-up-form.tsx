import { FC } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { SubmitAuthorizationFormSvg } from '../../../resources/svg/button-svg/submit';
import { FormErrorMessage } from '../../components/error-message-component';
import { FormInput } from '../../components/form-input-component';
import { SignUpFormFields } from '../../constants/authorization-consts/authorization-consts';
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
            name={SignUpFormFields.NICKNAME_TYPE}
            className={styles.signUpFormInput}
            placeholder={SignUpFormFields.NICKNAME_PLACEHOLDER}
            type={SignUpFormFields.NICKNAME_TYPE}
          />
          <FormErrorMessage message={errors.nickname?.message} className={styles.errorMessage} />
          <FormInput
            register={register}
            name={SignUpFormFields.PASSWORD_TYPE}
            className={styles.signUpFormInput}
            placeholder={SignUpFormFields.PASSWORD_PLACEHOLDER}
            type={SignUpFormFields.PASSWORD_TYPE}
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
