import React, { Component } from "react";
import { createPortal } from "react-dom"
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalRoot = document.getElementById("modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdprop = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  CloseModal = () => {
    this.props.onClose();
  }
  
  


  render() {
    const { url, alt } = this.props;
    return createPortal(
        <div className={styles.Overlay} onClick={this.handleBackdprop}>
        <div className={styles.Modal}>
          <img src={url} alt={alt} />
          <button
            className={styles.CloseBtn}
            onClick={this.handleBackdprop}
                >
            <span className={styles.close} onClick={this.CloseModal}>X</span>
          </button>
        </div>
        </div>,
        modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string,
  handleBackdpropClick: PropTypes.func.isRequired,
};
