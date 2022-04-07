import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

import css from './Day.module.css';
import DayModel from '../../../models/DayModel';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

const Day: React.FC<{ day: DayModel }> = (props) => {
  return (
    <div className={css.day}>
      <div className={`${css['icon']} ${props.day.completed && css.completed}`}>
        {props.day.completed ? (
          <FontAwesomeIcon icon={regular('circle-check')} />
        ) : (
          <FontAwesomeIcon icon={regular('circle')} />
        )}
      </div>
      <div className={css['day-date']}>
        {dayjs(props.day.date)
          .format('L')
          .split('/')
          .slice(0, 2)
          .map((part) => +part)
          .join('/')}
      </div>
    </div>
  );
};

export default Day;
