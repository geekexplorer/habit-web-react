import React, { useState } from 'react';

import parse from 'html-react-parser';
import { CSSTransition } from 'react-transition-group';

import { HabitController } from './controllers/HabitController';

import css from './App.module.css';

import { useEffect } from 'react';

import HabitList from './components/Habit/HabitList/HabitList';
import HabitModel from './models/HabitModel';
import AlertModal from './components/UI/AlertModal';
import Spinner from './components/UI/Spinner';
import { faScaleBalanced } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [habits, setHabits] = useState<HabitModel[]>([]);
  const [error, setError] = useState<string>();
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    const loadHabits = async () => {
      handleToggleSpinner();
      const response = await HabitController.getHabits();

      if (!response.success) {
        handleError(response.data as string);
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
      handleError(result.data as string);
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
      handleError(result.data as string);
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
      handleError(result.data as string);
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

  const handleError = (message: string) => {
    setError(message);
    setSpinner(false);
  };

  // Modal Handlers
  const handleModalClose = () => {
    setError(undefined);
  };

  const getMessageElement = () => {
    return parse(error as string);
  };

  console.log(css['spinner-container']);

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
      <CSSTransition
        in={spinner}
        timeout={2000}
        classNames={{
          enter: css['spinner-container-enter'],
          enterActive: css['spinner-container-enter-active'],
          exit: css['spinner-container-exit'],
          exitActive: css['spinner-container-exit-active'],
        }}
        unmountOnExit
        // onEnter={() => setSpinner(true)}
        // onExited={() => setSpinner(false)}
      >
        <div className={css['spinner-container']}>
          <Spinner />
        </div>
      </CSSTransition>
    </div>
  );
}

export default App;
