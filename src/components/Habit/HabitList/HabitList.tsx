import { Fragment, useState } from 'react';

import css from './HabitList.module.css';

import PageTitle from '../../UI/PageTitle';
import ActionBar from '../../UI/ActionBar';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';

enum ModalType {
  'CREATE',
  'EDIT',
  'DELETE',
  'ERROR',
}

const HabitList = () => {
  // State
  const [showModal, setShowModal] = useState(true);
  const [modalType, setModalType] = useState<ModalType | null>(
    ModalType.CREATE
  );

  // Handlers
  const handleCreateNewHabit = () => {
    console.log('click');
    setShowModal(true);
    setModalType(ModalType.CREATE);
  };

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
    return <Modal onExit={handleModalExit}></Modal>;
  };

  return (
    <Fragment>
      {showModal ? renderModal() : ''}
      <div className={css['habit-list']}>
        <PageTitle text='My Habit List' />
        <div>
          <ul>
            <li>Morning Meditation</li>
          </ul>
        </div>
        <ActionBar>
          <Button buttonType='habit-list' onClick={handleCreateNewHabit}>
            Create New Habit
          </Button>
        </ActionBar>
      </div>
    </Fragment>
  );
};

export default HabitList;
