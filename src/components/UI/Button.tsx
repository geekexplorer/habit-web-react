import css from './Button.module.css';

const Button: React.FC<{ onClick: () => void }> = (props) => {
  return (
    <div className={css.button} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default Button;
