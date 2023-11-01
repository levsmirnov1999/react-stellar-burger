import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
const modalsContainer = document.getElementById("modals");

const Modal = ({ closeModal, children }) => {
  React.useEffect(() => {
    const handleEscKeydown = (e) => {
      e.key === "Escape" && closeModal(e);
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
          <CloseIcon onClick={closeModal} />
        </div>
        {children}
      </div>
      <ModalOverlay closeModal={closeModal} />
    </>,
    modalsContainer
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
