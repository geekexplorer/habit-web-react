import React from 'react';

import './App.css';
import { CreateHabitData } from './components/Habit/HabitForm/HabitForm';

import HabitList from './components/Habit/HabitList/HabitList';

function App() {
  const handleCreateNewHabit = (habitData: CreateHabitData) => {
    console.log(habitData);
  };

  return (
    <div className='App'>
      <HabitList onCreateNewHabit={handleCreateNewHabit}></HabitList>
    </div>
  );
}

export default App;
