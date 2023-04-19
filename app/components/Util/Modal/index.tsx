import { useNavigate } from "@remix-run/react";
import React, { ReactNode, useCallback, useEffect } from "react";

interface Props {
  children: ReactNode;
}

const KEY_NAME_ESC = "Escape";

export function Modal({ children }: Props) {
  const navigate = useNavigate();

  // close modal with 'esc' key
  useEffect(() => {
    const useEscapeHandler = (event: KeyboardEvent) => {
      if (event.key === KEY_NAME_ESC) {
        navigate("..");
      }
    };

    document.addEventListener("keydown", useEscapeHandler);

    return () => document.removeEventListener("keydown", useEscapeHandler);
  }, []);

  return (
    <div className="modal-backdrop" onClick={() => navigate("..")}>
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
