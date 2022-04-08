/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { React, useState } from 'react';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';

function Fav(props) {
  const {
    place, username, rating, price, activityId, address, city, state, zipCode, yelpUrl,
    imageUrl,
  } = props;

  // eslint-disable-next-line no-unused-vars
  const [disabled, setDisabled] = useState(false);
  const [activities, setActivities] = useState([]);

  const info = {
    username,
    place,
    rating,
    price,
    activityId,
    address,
    city,
    state,
    zipCode,
    yelpUrl,
    imageUrl,
  };

  function save(activities) {
    console.log(activities);
    try {
      fetch('/add_to_favorites', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(
          activities,
        ),
      }).then((response) => response.json());
    } catch (e) {
      alert('sorry');
    }
  }

  function handleClick() {
    setActivities(info);
    save(info);
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
