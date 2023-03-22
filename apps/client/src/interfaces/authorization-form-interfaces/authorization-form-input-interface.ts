import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

export interface FormInputProperties<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  className: string;
  placeholder: string;
  type: string;
}
