"use client";

import Modal from "@/components/modal/Modal";
import React, { createContext, useContext, useState } from "react";
import ConfirmationModal from "@/components/modal/ConfirmationModal";
import CodeCellModal from "@/components/modal/CodeCellModal";

type ModalContextType = {
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  openConfirmationModal: (content: React.ReactNode) => void;
  closeConfirmationModal: () => void;
  openCodeCellModal: (content: React.ReactNode) => void;
  closeCodeCellModal: () => void;
};

const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
  closeModal: () => {},
  openConfirmationModal: () => {},
  closeConfirmationModal: () => {},
  openCodeCellModal: () => {},
  closeCodeCellModal: () => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(<></>);
  const [confirmationModalContent, setConfirmationModalContent] =
    useState<React.ReactNode>(<></>);

  const [codeCellModalContent, setCodeCellModalContent] =
    useState<React.ReactNode>(<></>);

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const openConfirmationModal = (content: React.ReactNode) => {
    setConfirmationModalContent(content);
    setIsConfirmationOpen(true);
  };

  const openCodeCellModal = (content: React.ReactNode) => {
    setCodeCellModalContent(content);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationOpen(false);
    setConfirmationModalContent(null);
  };

  const closeCodeCellModal = () => {
    setCodeCellModalContent(null);
  };

  return (
    <ModalContext.Provider
      value={{
        openModal,
        openConfirmationModal,
        openCodeCellModal,
        closeModal,
        closeConfirmationModal,
        closeCodeCellModal,
      }}>
      {children}
      <Modal isOpen={isOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={closeConfirmationModal}>
        {confirmationModalContent}
      </ConfirmationModal>
      <CodeCellModal
        isOpen={!!codeCellModalContent}
        onClose={closeCodeCellModal}>
        {codeCellModalContent}
      </CodeCellModal>
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
export const useConfirmationModal = () => useContext(ModalContext);
