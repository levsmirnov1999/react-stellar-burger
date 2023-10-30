import React from "react";
import styles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay({ closeModal }) {
  const closeModalOverlay = (evt) => {
    if (evt.target.classList.contains(styles.overlay)) {
      closeModal();
    }
  };
  return <div className={styles.overlay} onClick={closeModalOverlay}></div>;
}

ModalOverlay.propTypes = {
  close: PropTypes.func.isRequired,
};

export default ModalOverlay;
