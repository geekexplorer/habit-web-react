import css from './AlertModal.module.css';

import Modal from './Modal';
import PageTitle from './PageTitle';
import ActionBar from './ActionBar';
import Button from './Button';

export type AlertModalProps = {
  title: string;
  message: JSX.Element;
  action?: () => void;
  onClose: () => void;
};

const AlertModal: React.FC<AlertModalProps> = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <div className={css['alert-content']}>
        <PageTitle text={props.title} />
        <div className={css['message-text']}>{props.message}</div>
        <ActionBar>
          <Button onClick={props.onClose}>Go Back</Button>
          {props.action && <Button onClick={props.action}>OK</Button>}
        </ActionBar>
      </div>
    </Modal>
  );
};

export default AlertModal;
