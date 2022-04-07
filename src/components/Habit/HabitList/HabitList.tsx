import { Fragment, useState } from 'react';

import css from './HabitList.module.css';

import PageTitle from '../../UI/PageTitle';
import ActionBar from '../../UI/ActionBar';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';
import HabitForm, { CreateHabitData } from '../HabitForm/HabitForm';
import HabitModel from '../../../models/HabitModel';

import HabitItem from '../HabitItem/HabitItem';

enum ModalType {
  'CREATE',
  'EDIT',
  'DELETE',
  'ERROR',
}

const HabitList: React.FC<{
  onCreateNewHabit: (habitData: CreateHabitData) => void;
  habitListModel: HabitModel[];
}> = (props) => {
  // State
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(ModalType.CREATE);

  //  HabitList Handlers
  const handleCreateNewHabitBtnClick = () => {
    setShowModal(true);
    setModalType(ModalType.CREATE);
  };

  // Modal Handlers
  const handleModalExit = () => {
    setShowModal(false);
  };

  // Modals
  const renderModal = () => {
    switch (modalType) {
      case ModalType.CREATE:
        return renderCreateModal();
    }
  };

  const renderCreateModal = () => {
    return (
      <Modal onClose={handleModalExit}>
        <HabitForm onSubmit={props.onCreateNewHabit}></HabitForm>
      </Modal>
    );
  };

  const renderHabits = () => {
    console.log('here');
    if (props.habitListModel && props.habitListModel.length > 0) {
      return (
        <ul>
          {props.habitListModel.map((habit) => (
            <HabitItem key={habit.id} habit={habit} />
          ))}
        </ul>
      );
    } else {
      return 'You are not currently tracking any habits.';
    }
  };

  return (
    <Fragment>
      {showModal ? renderModal() : ''}
      <div className={css['habit-list']}>
        <PageTitle text='My Habit List' />
        <div className={css['habit-list']}>{renderHabits()}</div>
        <ActionBar>
          <Button onClick={handleCreateNewHabitBtnClick}>Create New Habit</Button>
        </ActionBar>
      </div>
    </Fragment>
  );
};

export default HabitList;
