import css from './HabitDays.module.css';

import Day from './Day';
import DayModel from '../../../models/DayModel';

const HabitDays: React.FC<{ days: DayModel[] }> = (props) => {
  const renderDays = () => {
    return props.days.map((day) => {
      return <Day key={day.date} day={day} />;
    });
  };

  return <div className={css['habit-days']}>{renderDays()}</div>;
};

export default HabitDays;
