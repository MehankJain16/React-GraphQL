import React, { useState, forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = forwardRef(
  ({ title, children, setCancel, setConfirm, onConfirm, confirmText }, ref) => {
    const [isModalShown, setIsModalShown] = useState(false);

    useImperativeHandle(ref, () => {
      return {
        show: () => openModal(),
        hide: () => closeModal(),
      };
    });

    const openModal = () => {
      setIsModalShown(true);
    };

    const closeModal = () => {
      setIsModalShown(false);
    };

    if (isModalShown) {
      return ReactDOM.createPortal(
        <div className={"modal-wrapper"}>
          <Backdrop show={isModalShown} click={closeModal} />
          <div className={"modal-box"}>
            <header className="modal__header">
              <h3>{title}</h3>
            </header>
            <section className="modal__content">{children}</section>
            <section className="modal__actions">
              {setCancel && (
                <button className="modal__actions__btn" onClick={closeModal}>
                  Close
                </button>
              )}
              {setConfirm && (
                <button className="modal__actions__btn" onClick={onConfirm}>
                  {confirmText}
                </button>
              )}
            </section>
          </div>
        </div>,
        document.getElementById("modal-root")
      );
    }
    return null;
  }
);

export default Modal;
