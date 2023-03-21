import { FC } from 'react';

import { FormErrorMessageProperties } from '../interfaces/authorization-form-interfaces/authorization-form-errors-message-interface';

export const FormErrorMessage: FC<FormErrorMessageProperties> = ({ message, className }) => {
  return (
    <h4>
      <span className={className}>{message}</span>
    </h4>
  );
};
