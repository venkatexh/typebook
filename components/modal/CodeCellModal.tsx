"use client";

import { useModal } from "@/contexts/modal-context";

const CodeCellModal = ({ isOpen, children }: CodeCellModalProps) => {
  const { closeCodeCellModal } = useModal();
  return (
    isOpen && (
      <div
        className='fixed w-screen h-screen top-0 left-0 bg-black/60 bg-opacity-50 z-40'
        onClick={() => {
          closeCodeCellModal();
        }}>
        <div
          className={`absolute top-0 left-0 right-0 bottom-0 w-[90%] h-[90%] m-auto
        bg-zinc-900/30 shadow-xl border border-zinc-700 rounded-2xl 
          z-50 backdrop-filter backdrop-blur-xl bg-linear-to-b`}
          onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    )
  );
};

export default CodeCellModal;

export type CodeCellModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
};
