import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

import css from './HabitDetail.module.css';

import HabitModel from '../../../models/HabitModel';

export type HabitItemProps = {
  habit: HabitModel;
  handleDeleteHabit: (id: string) => void;
  handleEditHabit: (habit: HabitModel) => void;
};

const HabitDetail: React.FC<HabitItemProps> = (props) => {
  const handleDeleteClick = () => {
    props.handleDeleteHabit(props.habit.id!);
  };

  const handleEditClick = () => {
    props.handleEditHabit(props.habit);
  };

  return (
    <Fragment>
      <div className={css['habit-detail']}>
        <div className={css['habit-detail__title']}>
          <h3>{props.habit.name}</h3>
        </div>
        <div className={css['habit-detail__start-date']}>{new Date(props.habit.startDate).toLocaleDateString()}</div>
        <div className={css['habit-detail__actions']}>
          <div onClick={handleEditClick}>
            <FontAwesomeIcon icon={regular('pen-to-square')} />
          </div>
          <div onClick={handleDeleteClick}>
            <FontAwesomeIcon icon={regular('trash-can')} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HabitDetail;
