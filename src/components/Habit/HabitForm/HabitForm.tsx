import { Fragment, useState, createRef } from 'react';

import css from './HabitForm.module.css';

import Button from '../../UI/Button';

const HabitForm: React.FC<{ onSubmit: () => void }> = (props) => {
  const [name, setName] = useState();
  const [duration, setDuration] = useState<number>();

  const nameRef = createRef<HTMLInputElement>();
  const durationRef = createRef<HTMLInputElement>();

  const handleSubmit = () => {
    const name = nameRef.current!.value;
    const duration = +durationRef.current!.value;
    console.log(name, duration);
  };

  return (
    <div className={css['form-container']}>
      <form onSubmit={props.onSubmit} className={css['habit-form']}>
        <h3 className={css['habit-form__title']}>Create New Habit</h3>
        <label htmlFor='name'>Name</label>
        <input ref={nameRef} type='text' name='name' id='name' value={name} />
        <label htmlFor='duration'>Duration</label>
        <input
          ref={durationRef}
          type='number'
          min='7'
          max='31'
          value={duration}
        />
      </form>
      <div className={css['button-container']}>
        <Button onClick={handleSubmit}>Create New Habit</Button>
      </div>
    </div>
  );
};

export default HabitForm;
