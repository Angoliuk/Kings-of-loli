import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

interface FormErrorMessageProperties {
  message: string | FieldError | Merge<FieldError, FieldErrorsImpl> | undefined;
  className: string;
}
export type { FormErrorMessageProperties };
