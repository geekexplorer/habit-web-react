import css from './PageTitle.module.css';

type PageTitleProps = {
  text: string;
  classes?: string;
};

const PageTitle: React.FC<PageTitleProps> = (props) => {
  return (
    <h1 className={`${css['page-title']} ${props.classes && ''}`}>
      {props.text}
    </h1>
  );
};

export default PageTitle;
export { type PageTitleProps };
