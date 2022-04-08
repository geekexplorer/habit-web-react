import css from './HabitDays.module.css';

import Day from './Day';
import DayModel from '../../../models/DayModel';

export type HabitDaysProps = {
  days: DayModel[];
  handleDayToggle: (day: DayModel) => void;
};

const HabitDays: React.FC<HabitDaysProps> = (props) => {
  const renderDays = () => {
    return props.days.map((day) => {
      return <Day key={day.date} day={day} handleDayToggle={props.handleDayToggle} />;
    });
  };

  return <div className={css['habit-days']}>{renderDays()}</div>;
};

export default HabitDays;
