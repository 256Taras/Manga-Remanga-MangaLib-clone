import React from 'react';

import { BsFillBookmarksFill } from 'react-icons/bs';
import { IoIosNotifications } from 'react-icons/io';
import { FaUserCircle, FaMoon } from 'react-icons/fa';
import useDarkMode from 'use-dark-mode';

import styles from './header-ui.module.scss';

import { NavbarUi } from '../navbar-ui/navbar-ui.component';


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const HeaderUi = ({ children }) => {

  const { value, enable, disable } = useDarkMode(false);

  function changeDarkMode() {
    if (value) {
      disable();
    } else if (!value) {
      enable();
    }
  }


  return (
    <div className={styles.root}>
      <div className='container'>
        <header className={` d-flex align-items-center justify-content-between`}>
          <NavbarUi />
          <div className={`d-flex justify-content-center align-items-center`}>
            {children}
            <button className='ghost-button' onClick={changeDarkMode}>
              <FaMoon className={styles.icon} />
            </button>
            <button className='ghost-button'>
              <BsFillBookmarksFill className={styles.icon} />
            </button>
            <button className='ghost-button'>
              <IoIosNotifications className={`${styles.icon} ${styles.notificationSize} `} />
            </button>
            <button className='ghost-button'>
              <FaUserCircle className={styles.icon} />
            </button>
          </div>
        </header>
      </div>
    </div>
  );
};

