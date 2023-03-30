import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { ReactNode } from 'rect';

interface FormInputProperties<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  className: string;
  placeholder: string;
  type: string;
  children: ReactNode;
}

export const FormInput = <T extends FieldValues>({
  register,
  name,
  className,
  placeholder,
  type,
  children,
}: FormInputProperties<T>) => {
  return (
    <input
      {...register(name)}
      className={className}
      placeholder={placeholder}
      type={type}
    >
      {children}
    </input>
  );
};
