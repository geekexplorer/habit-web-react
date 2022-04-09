import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import css from './Spinner.module.css';
import { useState } from 'react';

const Spinner = () => {
  return (
    <div className={css['spinner-container']}>
      <FontAwesomeIcon className={css.spinner} icon={regular('sun')} spin />
    </div>
  );
};

export default Spinner;
