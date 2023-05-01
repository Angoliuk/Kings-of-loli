import { type FC } from 'react';

type FormErrorProps = {
  error?: string;
};

export const FormError: FC<FormErrorProps> = ({ error }) => {
  return (
    <h4>
      <span>{error}</span>
    </h4>
  );
};
