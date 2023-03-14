import { VFC } from 'react';

import { FormErrorMessageProperties } from '../../interfaces/authorization-interfaces/authorization-form-errors-message-interface';

export const FormErrorMessage: VFC<FormErrorMessageProperties> = ({ message, className }) => {
  return (
    <h4>
      <span className={className}>{message}</span>
    </h4>
  );
};
