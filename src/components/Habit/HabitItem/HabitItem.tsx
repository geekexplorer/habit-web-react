import css from './HabitItem.module.css';

import HabitDetail from './HabitDetail';
import HabitDays from './HabitDays';

import HabitModel from '../../../models/HabitModel';
import DayModel from '../../../models/DayModel';

export type HabitItemProps = {
  habit: HabitModel;
  handleDeleteHabit: (id: string) => void;
  handleEditHabit: (habit: HabitModel) => void;
  handleToggleDay: (habit: HabitModel) => void;
};

const HabitItem: React.FC<HabitItemProps> = (props) => {
  const handleToggleDay = (day: DayModel) => {
    const updatedHabit = { ...props.habit } as HabitModel;
    const dayIndex = updatedHabit.days!.findIndex((d) => d.date === day.date);
    updatedHabit.days![dayIndex] = day;

    props.handleToggleDay(updatedHabit);
  };

  return (
    <div className={css['habit-item']}>
      <HabitDetail
        habit={props.habit}
        handleDeleteHabit={props.handleDeleteHabit}
        handleEditHabit={props.handleEditHabit}
      />
      <HabitDays days={props.habit.days!} handleDayToggle={handleToggleDay} />
    </div>
  );
};

export default HabitItem;
