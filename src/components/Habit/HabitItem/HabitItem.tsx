import css from './HabitItem.module.css';

import HabitDetail from './HabitDetail';
import HabitDays from './HabitDays';

import HabitModel from '../../../models/HabitModel';

export type HabitItemProps = {
  habit: HabitModel;
  handleDeleteHabit: (id: string) => void;
  handleEditHabit: (habit: HabitModel) => void;
};

const HabitItem: React.FC<HabitItemProps> = (props) => {
  return (
    <div className={css['habit-item']}>
      <HabitDetail
        habit={props.habit}
        handleDeleteHabit={props.handleDeleteHabit}
        handleEditHabit={props.handleEditHabit}
      />
      <HabitDays days={props.habit.days!} />
    </div>
  );
};

export default HabitItem;
