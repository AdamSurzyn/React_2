import { useContext, createContext, useState } from "react";
import React from "react";

type FormConfirmationProps = {
  showModal: boolean;
  toggleShowModal: () => void;
};

const ModalFormConfirmation = createContext<FormConfirmationProps | null>(null);
export const ModalFormConfirmationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showModal, setShowModal] = useState(false);
  const toggleShowModal = () => {
    setShowModal(!showModal);
  };
  return (
    <ModalFormConfirmation.Provider value={{ showModal, toggleShowModal }}>
      {children}
    </ModalFormConfirmation.Provider>
  );
};

export const useModalFormConfirmationContext = () => {
  const ctx = useContext(ModalFormConfirmation);

  if (!ctx) {
    throw new Error("Missing Context, it's not wraped in ThemeProvider");
  }

  return ctx;
};
