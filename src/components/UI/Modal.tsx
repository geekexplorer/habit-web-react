import { Fragment } from 'react';

import ReactDom from 'react-dom';

import css from './Modal.module.css';

import Button from './Button';

const portalElement: HTMLElement = document.getElementById('overlay-root')!;

const Backdrop: React.FC<{ onClick: () => void }> = (props) => {
  return <div className={css.backdrop} onClick={props.onClick}></div>;
};

const ModalOverlay: React.FC<{ onClose: () => void }> = (props) => {
  return (
    <div className={css.modal}>
      <div className={css['modal-header']}>
        <Button onClick={props.onClose}>X</Button>
      </div>
      <div className={css['modal-body']}>{props.children}</div>
    </div>
  );
};

const Modal: React.FC<{ onClose: () => void }> = (props) => {
  return (
    <Fragment>
      {ReactDom.createPortal(<Backdrop onClick={props.onClose} />, portalElement)}
      {ReactDom.createPortal(<ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
  );
};

export default Modal;
