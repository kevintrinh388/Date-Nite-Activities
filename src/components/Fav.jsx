/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Heart from 'react-animated-heart';
import 'react-toastify/dist/ReactToastify.css';
import {
  PROFILE_KEY,
} from '../constants/AuthConstants';
import showToast, { TOAST_ERROR, TOAST_SUCCESS } from '../utils/toastHelper';

function Fav(props) {
  const {
    place, username, rating, price, activityId, address, city, state, zipCode, yelpUrl,
    imageUrl,
  } = props;
  // const [heartStatus, changeHeartStatus] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [activities, setActivities] = useState([]);
  const currentUserProfile = JSON.parse(localStorage.getItem(PROFILE_KEY));
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
  const [isClick, setClick] = useState();
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
          currentUserProfile,
        ),
      }).then((response) => response.json()).then((data) => {
        if (data.message === true) {
          showToast('Activity already saved', TOAST_ERROR);
        } else {
          showToast('Activity saved successfully!', TOAST_SUCCESS);
        }
      });
    } catch (e) {
      alert('sorry');
    }
  }
  const deleteFavorites = (activities) => {
    console.log(activities);
    try {
      fetch('/delete_favorites', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(
          activities,
          currentUserProfile,
        ),
      }).then((response) => {
        if (response.status === 200) {
          showToast('Activity deleted', TOAST_SUCCESS);
          return true;
        }
        showToast('Activity Could not be deleted', TOAST_ERROR);
        return false;
      });
    } catch (e) {
      alert('sorry');
    }
  };
  async function exists(activities) {
    try {
      await fetch('/check_favorites', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(
          activities,
          currentUserProfile,
        ),
      }).then((response) => response.json()).then((data) => {
        if (data.message === false) {
          setClick(false);
        } else {
          console.log('found');
          setClick(true);
        }
      });
    } catch (e) {
      console.log('sorry');
    }
  }
  useEffect(() => {
    exists(info);
  }, []);
  function handleClick() {
    if (!isClick) {
      setActivities(info);
      save(info);
      setClick(true);
    } else {
      console.log('should delete activity now');
      const DidItDelete = deleteFavorites(info);
      if (DidItDelete === true) {
        setClick(false);
      }
    }
  }

  return (
    <Heart width="30" height="30" isClick={isClick} onClick={() => handleClick()} />
  );
}

Fav.propTypes = {
  place: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,

};

export default Fav;
