import React from 'react';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppLink } from '@manga/ui/common';
import styles from './navbar-ui.module.scss';


const logo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Mangekyou_Sharingan_Kakashi.svg/480px-Mangekyou_Sharingan_Kakashi.svg.png';


export const NavbarUi = () => {
  return (
    <nav className={styles.navigation}>
      <ul className={'d-flex align-items-center justify-content-between'}>
        <li className={styles.navItem}>
          <AppLink className={styles.navLink} href={'/'}>
            <img src={logo} alt='logo home' className={styles.logo} />
          </AppLink></li>
        <li className='ghost-button'><AppLink className={styles.navLink} href={'/top'}>Top 100</AppLink></li>
        <li className='ghost-button'><AppLink className={styles.navLink} href={'/catalog'}>Catalog</AppLink></li>
        <li className='ghost-button'><AppLink className={styles.navLink} href={'/recommend'}>Recommend</AppLink></li>
      </ul>
    </nav>
  );
};


