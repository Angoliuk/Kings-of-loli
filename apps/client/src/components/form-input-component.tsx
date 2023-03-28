import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

export interface FormInputProperties<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  className: string;
  placeholder: string;
  type: string;
}

export const FormInput = <T extends FieldValues>({
  register,
  name,
  className,
  placeholder,
  type,
}: FormInputProperties<T>) => {
  return <input {...register(name)} className={className} placeholder={placeholder} type={type} />;
};
