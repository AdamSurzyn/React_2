import { useContext, createContext, useState } from "react";
import React from "react";

export const ModalFormConfirmationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <ModalFormConfirmationContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </ModalFormConfirmationContext.Provider>
  );
};

export const useModalFormConfirmationContext = () => {
  const ctx = useContext();

  if (!ctx) {
    throw new Error("Missing Context, it's not wraped in ThemeProvider");
  }

  return ctx;
};
