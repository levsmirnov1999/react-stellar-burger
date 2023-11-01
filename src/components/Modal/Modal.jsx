import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
const modalsContainer = document.getElementById("modals");

const Modal = ({ closeModal, onClick, children }) => {
  React.useEffect(() => {
    document.addEventListener("keydown", handleEscKeydown);
    return () => {
      document.removeEventListener("keydown", handleEscKeydown);
    };
  }, []);

  const handleEscKeydown = (e) => {
    e.key === "Escape" && onClick(e);
  };

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.closeButton} onClick={closeModal}>
          <CloseIcon onClick={closeModal} />
        </div>
        {children}
      </div>
      <ModalOverlay onClick={onClick} />
    </>,
    modalsContainer
  );
};

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
