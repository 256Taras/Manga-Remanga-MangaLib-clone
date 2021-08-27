import React from 'react';
import { BsSearch } from 'react-icons/bs';

import styles from './search.module.scss';

export const SearchUi = () => {


  function searchHandler(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
  }


  return (
    <div className={styles.form} role='search'>
      <button className='ghost-button d-flex justify-content-center align-items-center cup' onClick={searchHandler}>
        <BsSearch className={styles.search_icon} />
      </button>
      <input className={styles.input} type='search' placeholder='Search...' aria-label='Search through site content' />
    </div>
  );
};


