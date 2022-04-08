/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import { Icon } from '@iconify/react';

function Fav() {
  return (
    // eslint-disable-next-line no-console
    <a href="#" onClick={() => { console.log('hi'); }}>
      <Icon icon="akar-icons:heart" width="30" height="30" />
    </a>
  );
}

export default Fav;
