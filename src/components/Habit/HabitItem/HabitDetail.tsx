import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

import css from './HabitDetail.module.css';

import HabitModel from '../../../models/HabitModel';

const HabitDetail: React.FC<{ habit: HabitModel }> = (props) => {
  return (
    <Fragment>
      <div className={css['habit-detail']}>
        <div className={css['habit-detail__title']}>
          <h3>{props.habit.title}</h3>
        </div>
        <div className={css['habit-detail__start-date']}>{new Date(props.habit.dateStarted).toLocaleDateString()}</div>
        <div className={css['habit-detail__actions']}>
          <div>
            <FontAwesomeIcon icon={regular('pen-to-square')} />
          </div>
          <div>
            <FontAwesomeIcon icon={regular('trash-can')} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HabitDetail;
