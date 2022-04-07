import css from './HabitItem.module.css';

import HabitDetail from './HabitDetail';
import HabitDays from './HabitDays';

import HabitModel from '../../../models/HabitModel';

const HabitItem: React.FC<{ habit: HabitModel; onDeleteHabit: (id: string) => void }> = (props) => {
  return (
    <div className={css['habit-item']}>
      <HabitDetail habit={props.habit} onDeleteHabit={props.onDeleteHabit} />
      <HabitDays days={props.habit.days} />
    </div>
  );
};

export default HabitItem;
