import { type ModalContext, modalContext } from '@web/interfaces/modal-context/modal-context';
import { type FC, type ReactNode, useState } from 'react';

type ModalProperties = {
  isOpen: boolean;
  content: ReactNode;
};
type ModalContextProperties = {
  children: ReactNode;
};

export const ModalProvider: FC<ModalContextProperties> = ({ children }) => {
  const [modalProperties, setModalProperties] = useState<ModalProperties>({
    isOpen: false,
    content: <></>,
  });

  const openModal = (content: ReactNode) => {
    setModalProperties({ isOpen: true, content: content });
  };

  const closeModal = () => {
    setModalProperties({ isOpen: false, content: null });
  };
  const modalContextValue: ModalContext = {
    modalProperties,
    openModal,
    closeModal,
  };
  return (
    <modalContext.Provider value={modalContextValue}>
      {modalProperties.content}
      {children}
    </modalContext.Provider>
  );
};
