import React from "react";
import { CgClose } from "react-icons/cg";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      } `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <div
          onClick={onClose}
          className="absolute z-30 top-2  right-2 text-gray rounded-lg hover:cursor-pointer bg-transparent hover:text-zinc-800"
        >
          <CgClose />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
