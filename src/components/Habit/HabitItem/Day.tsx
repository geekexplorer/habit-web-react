import css from './Day.module.css';
import DayModel from '../../../models/DayModel';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

const Day: React.FC<{ day: DayModel }> = (props) => {
  return (
    <div className={css.day}>
      <div>{props.day.completed.toString()}</div>
      <div>{dayjs(props.day.date).format('L').split('/').slice(0, 2).join('/')}</div>
    </div>
  );
};

export default Day;
