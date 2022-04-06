import { Fragment, useState, createRef } from 'react';

import css from './HabitForm.module.css';

import Button from '../../UI/Button';
import { stringify } from 'querystring';
import { setDefaultResultOrder } from 'dns/promises';

const HabitForm: React.FC<{ onSubmit: () => void }> = (props) => {
  const [name, setName] = useState();
  const [startDate, setStartDate] = useState<Date>();
  const [duration, setDuration] = useState<number>();
  const [error, setError] = useState<string>();

  const nameRef = createRef<HTMLInputElement>();
  const startDateRef = createRef<HTMLInputElement>();
  const durationRef = createRef<HTMLInputElement>();

  const handleSubmit = () => {
    const name = nameRef.current!.value;
    const startDate = new Date(startDateRef.current!.value);
    const duration = +durationRef.current!.value;

    if (!validateFormData(name, startDate, duration)) {
      return;
    }

    setError(undefined);
    console.log(name, startDate, duration);
  };

  const validateFormData = (
    name: string,
    startDate: Date,
    duration: number
  ): boolean => {
    if (name.length < 1) {
      setError('You must enter a habit name.');
      return false;
    }

    if (!startDate) {
      setError('You must enter a valid start date.');
      return false;
    }

    if (duration < 7 || duration > 31) {
      setError('You must enter a valid duration between 7 and 31 days.');
      return false;
    }

    return true;
  };

  const getDateInputFormat = (date: Date) => {
    const month = (date.getMonth() + 1).toString();
    const dayOfMonth = date.getDate().toString();
    return `${date.getFullYear()}-${month.length === 1 ? `0${month}` : month}-${
      dayOfMonth.length === 1 ? `0${dayOfMonth}` : dayOfMonth
    }`;
  };

  return (
    <div className={css['form-container']}>
      <form onSubmit={props.onSubmit} className={css['habit-form']}>
        <h3 className={css['habit-form__title']}>Create New Habit</h3>
        {error && <div className={css['error-message']}>{error}</div>}
        <label htmlFor='name'>Name</label>
        <input ref={nameRef} type='text' name='name' id='name' value={name} />
        <label htmlFor='name'>Name</label>
        <input
          ref={startDateRef}
          type='date'
          name='startDate'
          id='startDate'
          defaultValue={
            startDate
              ? getDateInputFormat(startDate)
              : getDateInputFormat(new Date())
          }
        />
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
