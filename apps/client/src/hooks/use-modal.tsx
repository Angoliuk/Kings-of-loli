import { useContext } from 'react';

import { ModalContext, modalContext } from '../interfaces/modal-context/modal-context';

export const useModalContext = () => {
  return useContext<ModalContext>(modalContext);
};
