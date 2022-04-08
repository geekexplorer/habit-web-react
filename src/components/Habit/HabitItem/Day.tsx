import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

import css from './Day.module.css';
import DayModel from '../../../models/DayModel';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

export type DayProps = {
  day: DayModel;
  handleDayToggle: (Day: DayModel) => void;
};

const Day: React.FC<DayProps> = (props) => {
  const [completed, setCompleted] = useState(props.day.completed);

  const handleDayClick = () => {
    const updatedDay = new DayModel(props.day.date, !props.day.completed);
    props.handleDayToggle(updatedDay);
    setCompleted((prev) => !prev);
  };

  return (
    <div className={css.day}>
      <div className={`${css['icon']} ${completed && css.completed}`} onClick={handleDayClick}>
        {completed ? <FontAwesomeIcon icon={regular('circle-check')} /> : <FontAwesomeIcon icon={regular('circle')} />}
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
