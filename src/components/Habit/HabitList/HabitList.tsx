import { Fragment, useState } from 'react';

import css from './HabitList.module.css';

import PageTitle from '../../UI/PageTitle';
import ActionBar from '../../UI/ActionBar';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';
import HabitForm, { CreateHabitData } from '../HabitForm/HabitForm';

enum ModalType {
  'CREATE',
  'EDIT',
  'DELETE',
  'ERROR',
}

const HabitList: React.FC<{
  onCreateNewHabit: (habitData: CreateHabitData) => void;
}> = (props) => {
  // State
  const [showModal, setShowModal] = useState(true);
  const [modalType, setModalType] = useState<ModalType | null>(
    ModalType.CREATE
  );

  //  HabitList Handlers
  const handleCreateNewHabitBtnClick = () => {
    console.log('click');
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
          <Button onClick={handleCreateNewHabitBtnClick}>
            Create New Habit
          </Button>
        </ActionBar>
      </div>
    </Fragment>
  );
};

export default HabitList;
