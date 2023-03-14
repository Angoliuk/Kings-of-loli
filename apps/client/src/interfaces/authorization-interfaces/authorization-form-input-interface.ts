import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface FormInputProperties<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  className: string;
  placeholder: string;
  type: string;
}

export type { FormInputProperties };
