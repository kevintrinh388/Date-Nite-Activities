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
  function handleSave(info) {
    try {
      fetch('/add_to_favorites', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(info),
      }).then((response) => response.json());
    } catch (e) {
      console.log(e);
    }
  }


}
function handleClick() {
  console.log(activites);
  setActivities(info);
  handleSave(info);
  setDisabled(true);
}
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
