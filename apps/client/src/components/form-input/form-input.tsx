import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { FormErrorMessage } from '../error-message/error-message';

type FormInputProperties<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  className: string[];
  placeholder: string;
  type: string;
  error?: string;
};
export const FormInput = <T extends FieldValues>({
  register,
  name,
  className,
  placeholder,
  type,
  error,
}: FormInputProperties<T>) => {
  return (
    <>
      <input
        {...register(name)}
        className={className.join(' ')}
        placeholder={placeholder}
        type={type}
      />
      <FormErrorMessage message={error} />
    </>
  );
};
