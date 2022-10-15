import React, { useEffect } from "react";
import { createPortal } from "react-dom"
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalRoot = document.getElementById("modal-root");


const Modal = ({ onClose, url, alt }) => {
  
  useEffect(() => {
 const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
   
 };
    window.addEventListener('keydown', handleKeyDown);

return () => {
  window.removeEventListener('keydown', handleKeyDown);
};
    }, [onClose]);
    

  const handleBackdprop = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

    return createPortal(
        <div className={styles.Overlay} onClick={handleBackdprop}>
        <div className={styles.Modal}>
          <img src={url} alt={alt} />
          <button
            className={styles.CloseBtn}
            onClick={handleBackdprop}
                >
            <span className={styles.close} onClick={onClose}>X</span>
          </button>
        </div>
        </div>,
        modalRoot
    );
  }


export default Modal;

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
