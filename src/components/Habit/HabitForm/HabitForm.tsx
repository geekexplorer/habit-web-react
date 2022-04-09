import React, { useState, createRef, useEffect } from 'react';

import css from './HabitForm.module.css';

import HabitModel from '../../../models/HabitModel';
import Button from '../../UI/Button';
import PageTitle from '../../UI/PageTitle';

export type HabitFormProps = {
  habit?: HabitModel;
  submitText: string;
  onSubmit: (habitData: HabitModel) => void;
};

const HabitForm: React.FC<HabitFormProps> = (props) => {
  const [name, setName] = useState(props.habit?.name);
  const [startDate, setStartDate] = useState<Date>(props.habit ? new Date(props.habit.startDate) : new Date());
  const [duration, setDuration] = useState<number>(props.habit?.duration!);
  const [error, setError] = useState<string>();

  const nameRef = createRef<HTMLInputElement>();
  const startDateRef = createRef<HTMLInputElement>();
  const durationRef = createRef<HTMLInputElement>();

  const handleSubmit = () => {
    const name = nameRef.current!.value;
    const startDate = new Date(startDateRef.current!.value);
    const duration = durationRef.current!.value;

    if (!validateFormData(name, startDate, duration)) {
      return;
    }

    const updatedHabit = new HabitModel(name, startDate.toUTCString(), +duration);

    if (!props.habit) {
      props.onSubmit(updatedHabit);
      return;
    }

    updatedHabit.id = props.habit?.id;

    if (
      startDate.getDate() === new Date(props.habit?.startDate).getDate() &&
      +duration === props.habit?.duration &&
      props.habit.days
    ) {
      updatedHabit.days = [...props.habit.days];
    }

    props.onSubmit(updatedHabit);
  };

  const validateFormData = (name: string, startDate: Date, duration: string) => {
    if (name.length < 1) {
      setError('You must enter a habit name.');
      return false;
    }

    const parsedDate = new Date(startDate);
    if (!parsedDate) {
      setError('You must enter a valid start date.');
      return false;
    }
    const durationNum = +duration;
    if (!duration || durationNum < 7 || durationNum > 31) {
      setError('You must enter a habit duration between 7 and 31 days.');
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
      <form className={css['habit-form']}>
        <PageTitle text='Create New Habit'></PageTitle>
        {error && <div className={css['error-message']}>{error}</div>}
        <label htmlFor='name'>Name</label>
        <input ref={nameRef} type='text' name='name' id='name' defaultValue={name} />
        <label htmlFor='startDate'>Start Date</label>
        <input
          ref={startDateRef}
          type='date'
          name='startDate'
          id='startDate'
          defaultValue={getDateInputFormat(startDate)}
        />
        <label htmlFor='duration'>Duration</label>
        <input ref={durationRef} type='number' min='7' max='31' defaultValue={duration || 7} />
      </form>
      <div className={css['button-container']}>
        <Button onClick={handleSubmit}>{props.submitText}</Button>
      </div>
    </div>
  );
};

export default HabitForm;
