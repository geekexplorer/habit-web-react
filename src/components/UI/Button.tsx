import React, { HTMLAttributes } from 'react';

import css from './Button.module.css';

interface ButtonProps {
  buttonType?: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className={`${css.button} ${props.buttonType ?? ''}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
export { type ButtonProps };
