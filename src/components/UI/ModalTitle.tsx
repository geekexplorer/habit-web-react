import css from './ModalTitle.module.css';

export type ModalTitleProps = {
  text: string;
  classes?: string;
};

const ModalTitle: React.FC<ModalTitleProps> = (props) => {
  return <h2 className={`${css['modal-title']} ${props.classes && ''}`}>{props.text}</h2>;
};

export default ModalTitle;
