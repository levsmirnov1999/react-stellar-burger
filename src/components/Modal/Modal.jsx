import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";

function Modal({ children, close }) {
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [close]);
  return ReactDOM.createPortal(
    <>
      <ModalOverlay close={close} />
      <div className={`${styles.modal} pt-10 pb-15`}>
        <button className={styles.closeButton} onClick={close}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </>,
    document.getElementById("modals")
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
};

export default Modal;
