import css from './ActionBar.module.css';

type ActionBarProps = {
  classes?: string;
};

const ActionBar: React.FC<ActionBarProps> = (props) => {
  return (
    <div className={`${css['action-bar']} ${props.classes ?? ''}`}>
      {props.children}
    </div>
  );
};

export default ActionBar;
export { type ActionBarProps };
