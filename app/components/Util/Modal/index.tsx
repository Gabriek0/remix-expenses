import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  // onClose: () => void;
}

export function Modal({ children }: Props) {
  // onClick={onClose}
  return (
    <div className="modal-backdrop">
      <dialog
        className="modal"
        open
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </dialog>
    </div>
  );
}
