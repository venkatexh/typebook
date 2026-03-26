"use client";

import { useModal } from "@/contexts/modal-context";

const Modal = ({
  isOpen,
  children,
  width = "w-[80vw] lg:w-[50vw] max-w-3xl",
  height = "h-[60vh] lg:h-[50vh] max-h-[400px]",
}: ModalProps) => {
  const { closeModal } = useModal();
  return (
    isOpen && (
      <div
        className='fixed w-screen h-screen top-0 left-0 bg-black/60 bg-opacity-50 z-40'
        onClick={() => {
          closeModal();
        }}>
        <div
          className={`absolute ${width} ${height} top-0 left-0 right-0 bottom-0 m-auto
          flex flex-col bg-zinc-900/30 shadow-xl border border-zinc-700 rounded-2xl 
          z-50 backdrop-filter backdrop-blur-xl bg-linear-to-b`}
          onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
};
