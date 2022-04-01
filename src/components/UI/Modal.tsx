import { Fragment } from 'react';

import ReactDom from 'react-dom';

import css from './Modal.module.css';

import Button from './Button';
import ActionBar from './ActionBar';

const overlayElement = document.getElementById('overlay-root')!;

const Backdrop: React.FC<{ onClick: () => void }> = (props) => {
  return ReactDom.createPortal(
    <div className={css.backdrop} onClick={props.onClick}></div>,
    overlayElement
  );
};

const ModalContent: React.FC<{ onExit: () => void }> = (props) => {
  return ReactDom.createPortal(
    <div className={css['modal']}>
      <div className={css['modal-content']}>
        <div className={css['modal-content__header']}>
          <Button onClick={props.onExit}>Exit</Button>
        </div>
      </div>
      {props.children}
    </div>,
    overlayElement
  );
};

const Modal: React.FC<{ onExit: () => void }> = (props) => {
  return (
    <Fragment>
      <Backdrop onClick={props.onExit} />
      <ModalContent onExit={props.onExit}>{props.children}</ModalContent>
    </Fragment>
  );
};

export default Modal;
