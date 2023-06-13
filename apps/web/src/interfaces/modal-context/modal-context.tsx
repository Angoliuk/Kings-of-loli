import { createContext, type ReactNode } from 'react';

export type ModalContext = {
  modalProperties: { isOpen: boolean; content: ReactNode };
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
};
export const modalContext = createContext<ModalContext>({
  modalProperties: { isOpen: false, content: <></> },
  openModal: () => {},
  closeModal: () => {},
});
