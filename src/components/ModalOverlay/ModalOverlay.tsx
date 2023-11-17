import React from "react";
import styles from "./ModalOverlay.module.css";

interface IModalOverlay {
  closeModal: () => void;
}

export const ModalOverlay: React.FC<IModalOverlay> = ({ closeModal }) => {
  return <div className={styles.overlay} onClick={closeModal} />;
};
