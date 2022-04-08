/* eslint-disable linebreak-style */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { React, useState } from 'react';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';

function Fav(props) {
  const {
    place, username, rating, price,
  } = props;

  // eslint-disable-next-line no-unused-vars
  const [disabled, setDisabled] = useState(false);
  const [activities, setActivities] = useState([]);

  const info = {
    username,
    place,
    rating,
    price,
  };

  function handleClick() {
    setActivities(info);
    setDisabled(true);
  }

  console.log(activities);
  return (
    <button
      disabled={disabled}
      onClick={() => { handleClick(); }}
    >
      <Icon icon="akar-icons:heart" width="30" height="30" />
    </button>
  );
}

Fav.propTypes = {
  place: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,

};

export default Fav;
