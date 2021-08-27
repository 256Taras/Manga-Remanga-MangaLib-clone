import React, { memo } from 'react';

//import styles from './layout-ui.module.scss';
import { HeaderUi } from '../header-ui/header-ui.component';
import { SearchUi } from '../search-ui';

export const LayoutUi = memo(() => {
  return (
    <div>
      <HeaderUi>
        <SearchUi/>
      </HeaderUi>
    </div>
  );
});


