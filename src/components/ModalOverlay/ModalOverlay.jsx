import React from "react";
import styles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay({ close }) {
  const closeModalOverlay = (evt) => {
    if (evt.target.classList.contains(styles.overlay)) {
      close();
    }
  };
  return <div className={styles.overlay} onClick={closeModalOverlay}></div>;
}

ModalOverlay.propTypes = {
  close: PropTypes.func.isRequired,
};

export default ModalOverlay;
