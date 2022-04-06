import React, { useState } from 'react';

import { HabitController } from './controllers/Habitcontroller';

import './App.css';
import { CreateHabitData } from './components/Habit/HabitForm/HabitForm';

import HabitList from './components/Habit/HabitList/HabitList';
import HabitModel from './models/HabitModel';

function App() {
  const [habits, setHabits] = useState<HabitModel[]>([]);

  const handleCreateNewHabit = async (habitData: CreateHabitData) => {
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

  return (
    <div className='App'>
      <HabitList habitListModel={habits} onCreateNewHabit={handleCreateNewHabit}></HabitList>
    </div>
  );
}

export default App;
