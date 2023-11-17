import React from "react";
import ReactDOM from "react-dom";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
const modalsContainer = document.getElementById("modals") as HTMLElement;

interface IModal {
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<IModal> = ({ closeModal, children }) => {
  React.useEffect(() => {
    const handleEscKeydown = (e: KeyboardEvent) => {
      e.key === "Escape" && closeModal();
    };

    document.addEventListener("keydown", handleEscKeydown);
    return () => {
      document.removeEventListener("keydown", handleEscKeydown);
    };
  }, [closeModal]);

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.closeButton} onClick={closeModal}>
          <CloseIcon type="primary" onClick={closeModal} />
        </div>
        {children}
      </div>
      <ModalOverlay closeModal={closeModal} />
    </>,
    modalsContainer
  );
};

export default Modal;
