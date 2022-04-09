import { Fragment, useState, useEffect } from 'react';

import css from './HabitList.module.css';

import parse from 'html-react-parser';
import PageTitle from '../../UI/PageTitle';
import ActionBar from '../../UI/ActionBar';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';
import HabitForm from '../HabitForm/HabitForm';
import HabitModel from '../../../models/HabitModel';
import HabitItem from '../HabitItem/HabitItem';
import AlertModal from '../../UI/AlertModal';

enum ModalType {
  'CREATE',
  'EDIT',
  'DELETE',
  'ERROR',
}

export type HabitListProps = {
  onCreateNewHabit: (habitData: HabitModel) => void;
  onDeleteHabit: (id: string) => void;
  onEditHabit: (habitData: HabitModel) => void;

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

  // HabitItem Handlers
  const handleEditClick = (habit: HabitModel) => {
    setCurrentHabit(habit);
    setShowModal(true);
    setModalType(ModalType.EDIT);
  };

  const handleDeleteClick = (id: string) => {
    setCurrentHabit(props.habitListModel.find((habit) => habit.id === id));
    setShowModal(true);
    setModalType(ModalType.DELETE);
  };

  // Modal Handlers
  const handleModalExit = () => {
    setShowModal(false);
  };

  const handleCreateNewHabit = (habit: HabitModel) => {
    setShowModal(false);
    props.onCreateNewHabit(habit);
  };

  const handleEditHabit = (habit: HabitModel) => {
    setShowModal(false);
    props.onEditHabit(habit);
  };

  const handleDeleteHabit = () => {
    props.onDeleteHabit(currentHabit!.id!);
  };

  // Modals
  const renderModal = () => {
    switch (modalType) {
      case ModalType.CREATE:
        return renderCreateModal();
      case ModalType.EDIT:
        return renderEditModal();
      case ModalType.DELETE:
        return renderDeleteModal();
    }
  };

  const renderCreateModal = () => {
    return (
      <Modal onClose={handleModalExit}>
        <HabitForm onSubmit={handleCreateNewHabit} submitText='Create New Habit'></HabitForm>
      </Modal>
    );
  };

  const renderEditModal = () => {
    return (
      <Modal onClose={handleModalExit}>
        <HabitForm onSubmit={handleEditHabit} submitText='Edit Habit' habit={currentHabit}></HabitForm>
      </Modal>
    );
  };

  const renderDeleteModal = () => {
    const title = 'Just Checking...';

    const message = parse(
      `Are you sure you want to delete <span style='font-weight: bold'>${currentHabit!.name}</span>?`,
      {}
    );
    return (
      <AlertModal
        onClose={handleModalExit}
        action={handleDeleteHabit}
        message={message as JSX.Element}
        title={title}
      ></AlertModal>
    );
  };

  const renderHabits = () => {
    if (props.habitListModel && props.habitListModel.length > 0) {
      return props.habitListModel.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          handleDeleteHabit={handleDeleteClick}
          handleEditHabit={handleEditClick}
          handleToggleDay={props.onEditHabit}
        />
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
