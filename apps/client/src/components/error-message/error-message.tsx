import { FC, ReactNode } from 'react';

interface FormErrorMessageProperties {
  message: ReactNode;
  className: string;
}

export const FormErrorMessage: FC<FormErrorMessageProperties> = ({ message, className }) => {
  return (
    <h4>
      <span className={className}>{message}</span>
    </h4>
  );
};