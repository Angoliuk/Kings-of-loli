import { FieldValues } from 'react-hook-form';

import { FormInputProperties } from '../interfaces/authorization-form-interfaces/authorization-form-input-interface';

export const FormInput = <T extends FieldValues>({
  register,
  name,
  className,
  placeholder,
  type,
}: FormInputProperties<T>) => {
  return <input {...register(name)} className={className} placeholder={placeholder} type={type} />;
};
