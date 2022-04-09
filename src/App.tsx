import React, { useState } from 'react';

import parse from 'html-react-parser';

import { HabitController } from './controllers/HabitController';

import css from './App.module.css';

import { useEffect } from 'react';

import HabitList from './components/Habit/HabitList/HabitList';
import HabitModel from './models/HabitModel';
import AlertModal from './components/UI/AlertModal';
import Spinner from './components/UI/Spinner';
import { JSDocComment } from 'typescript';

function App() {
  const [habits, setHabits] = useState<HabitModel[]>([]);
  const [error, setError] = useState<string>();
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    const loadHabits = async () => {
      handleToggleSpinner();
      const response = await HabitController.getHabits();

      if (!response.success) {
        setError(response.data as string);
        return;
      }
      handleToggleSpinner();
      setHabits(response.data as HabitModel[]);
    };
    loadHabits();
  }, []);

  // Handlers

  const handleToggleSpinner = () => {
    setSpinner((prev) => !prev);
  };

  const handleCreateNewHabit = async (habitData: HabitModel) => {
    handleToggleSpinner();
    const result = await HabitController.createHabit(habitData);
    if (!result.success) {
      setError(result.data as string);
      return;
    }

    handleToggleSpinner();
    setHabits((prev) => {
      return [...prev, result.data as HabitModel];
    });
  };

  const handleDeleteHabit = async (id: string) => {
    handleToggleSpinner();
    const result = await HabitController.deleteHabit(id);

    if (!result.success) {
      setError(result.data as string);
      return;
    }
    handleToggleSpinner();
    setHabits((pre) => {
      return pre.filter((habit) => habit.id !== id);
    });
  };

  const handleEditHabit = async (habitData: HabitModel) => {
    handleToggleSpinner();
    const result = await HabitController.updateHabit(habitData.id!, habitData);
    if (!result.success) {
      setError(result.data as string);
      return;
    }

    const habitIndex = habits.findIndex((habit) => habit.id === habitData.id);
    handleToggleSpinner();
    setHabits((prev) => {
      const updatedHabits = [...prev];
      updatedHabits[habitIndex] = habitData;
      return updatedHabits;
    });
  };

  // Modal Handlers

  const handleModalClose = () => {
    setError(undefined);
  };

  const getMessageElement = () => {
    return parse(error as string);
  };

  return (
    <div className={css.App}>
      {error && (
        <AlertModal onClose={handleModalClose} title='An Error Occured' message={getMessageElement() as JSX.Element} />
      )}
      <HabitList
        habitListModel={habits}
        onCreateNewHabit={handleCreateNewHabit}
        onDeleteHabit={handleDeleteHabit}
        onEditHabit={handleEditHabit}
      />
      {spinner && (
        <div className={css['spinner-container']}>
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default App;
