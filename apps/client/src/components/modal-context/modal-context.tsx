import { FC, ReactNode, useState } from 'react';

import { ModalContext, modalContext } from '../../interfaces/modal-context/modal-context';

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
