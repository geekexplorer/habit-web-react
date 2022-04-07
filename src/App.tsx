import React, { useState } from 'react';

import { HabitController } from './controllers/HabitController';

import css from './App.module.css';

import { useEffect } from 'react';

import HabitList from './components/Habit/HabitList/HabitList';
import HabitModel, { HabitData } from './models/HabitModel';

function App() {
  const [habits, setHabits] = useState<HabitModel[]>([]);

  useEffect(() => {
    const loadHabits = async () => {
      // TODO: Add loading spinner

      const response = await HabitController.getHabits();

      if (!response.success) {
        // TODO: Surface error to UI here.
        return;
      }
      setHabits(response.data as HabitModel[]);

      // TODO: Remove loading spinner
    };
    loadHabits();
  }, []);

  // Handlers

  const handleCreateNewHabit = async (habitData: HabitData) => {
    const result = await HabitController.createHabit(habitData);
    if (!result.success) {
      // TODO: Need to surface error to UI here.
      console.error(result.data);
      return;
    }

    setHabits((prev) => {
      return [...prev, result.data as HabitModel];
    });
  };

  const handleDeleteHabit = async (id: string) => {
    const result = await HabitController.deleteHabit(id);

    if (!result.success) {
      //TODO: Surface error to ui
      return;
    }

    setHabits((pre) => {
      return pre.filter((habit) => habit.id !== id);
    });
  };

  const handleEditHabit = async (habitData: HabitData) => {
    console.log(habitData);
  };

  return (
    <div className={css.App}>
      <HabitList
        habitListModel={habits}
        onCreateNewHabit={handleCreateNewHabit}
        onDeleteHabit={handleDeleteHabit}
        onEditHabit={handleEditHabit}
      ></HabitList>
    </div>
  );
}

export default App;
