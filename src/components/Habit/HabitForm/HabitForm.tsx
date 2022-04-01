import { Fragment, useState } from 'react';

import css from './HabitForm.module.css';

import Button from '../../UI/Button';

const HabitForm: React.FC<{ onSubmit: () => void }> = (props) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState<number>();

  const validateForm = () => {};

  return (
    <div className={css['form-container']}>
      <form onSubmit={props.onSubmit} className={css['habit-form']}>
        <h3 className={css['habit-form__title']}>Create New Habit</h3>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' id='name' value={name} />
        <label htmlFor='duration'>Duration</label>
        <input type='number' min='7' max='31' value={duration} />
      </form>
      <div className={css['button-container']}>
        <Button onClick={validateForm}>Create New Habit</Button>
      </div>
    </div>
  );
};

export default HabitForm;
