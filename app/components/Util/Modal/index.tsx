import { useNavigate } from "@remix-run/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  // onClose: () => void;
}

export function Modal({ children }: Props) {
  const navigate = useNavigate();

  return (
    <div className="modal-backdrop" onClick={() => navigate("/expenses")}>
      <dialog
        open
        className="modal"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </dialog>
    </div>
  );
}
