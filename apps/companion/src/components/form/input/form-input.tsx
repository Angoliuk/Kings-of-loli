import { type FieldValues, type Path, type UseFormRegister } from 'react-hook-form';

import { FormError } from '../form-error/form-error';

type FormInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: string;
  inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
};
export const FormInput = <T extends FieldValues>({ register, name, error, inputProps }: FormInputProps<T>) => {
  return (
    <>
      <input {...inputProps} {...register(name)} />
      <FormError error={error} />
    </>
  );
};
