/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { React } from 'react';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';

function Fav(props) {
  const {
    place, username, rating, price,
  } = props;

  function sayhi() {
    console.log(place, username, rating, price);
  }

  return (
    // eslint-disable-next-line no-console
    <a href="#" onClick={() => { sayhi(); }}>
      <Icon icon="akar-icons:heart" width="30" height="30" />
    </a>
  );
}

Fav.propTypes = {
  place: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,

};

export default Fav;
