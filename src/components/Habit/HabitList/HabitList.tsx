import { Fragment, useState, useEffect } from 'react';

import css from './HabitList.module.css';

import PageTitle from '../../UI/PageTitle';
import ActionBar from '../../UI/ActionBar';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';
import HabitForm from '../HabitForm/HabitForm';
import HabitModel, { HabitData } from '../../../models/HabitModel';

import HabitItem from '../HabitItem/HabitItem';

enum ModalType {
  'CREATE',
  'EDIT',
  'DELETE',
  'ERROR',
}

export type HabitListProps = {
  onCreateNewHabit: (habitData: HabitData) => void;
  onDeleteHabit: (id: string) => void;
  onEditHabit: (habitData: HabitData) => void;
  habitListModel: HabitModel[];
};

const HabitList: React.FC<HabitListProps> = (props) => {
  // State
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(ModalType.CREATE);
  const [currentHabit, setCurrentHabit] = useState<HabitModel>();

  useEffect(() => {
    setShowModal(false);
  }, [props.habitListModel]);

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
        <HabitForm onSubmit={props.onCreateNewHabit} submitText='Create New Habit'></HabitForm>
      </Modal>
    );
  };

  const renderEditModal = () => {
    return (
      <Modal onClose={handleModalExit}>
        <HabitForm onSubmit={props.onEditHabit} submitText='Edit Habit' habit={currentHabit}></HabitForm>
      </Modal>
    );
  };

  const renderHabits = () => {
    if (props.habitListModel && props.habitListModel.length > 0) {
      return props.habitListModel.map((habit) => (
        <HabitItem key={habit.id} habit={habit} onDeleteHabit={props.onDeleteHabit} />
      ));
    } else {
      return 'You are not currently tracking any habits.';
    }
  };

  return (
    <Fragment>
      {showModal ? renderModal() : ''}
      <div className={css['habit-list']}>
        <PageTitle text='My Habit List' />
        <div className={css['habit-items']}>{renderHabits()}</div>
        <ActionBar>
          <Button onClick={handleCreateNewHabitBtnClick}>Create New Habit</Button>
        </ActionBar>
      </div>
    </Fragment>
  );
};

export default HabitList;
