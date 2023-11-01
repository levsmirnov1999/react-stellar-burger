import PropTypes from "prop-types";
import styles from "./ModalOverlay.module.css";

export const ModalOverlay = ({ closeModal }) => {
  return <div className={styles.overlay} onClick={closeModal} />;
};

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
