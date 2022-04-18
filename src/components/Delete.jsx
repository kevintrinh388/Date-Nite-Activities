/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { React, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import showToast, { TOAST_ERROR, TOAST_SUCCESS } from '../utils/toastHelper';

function Del(props) {
  const {
    username, place, rating, range, address1, city, zipcode, state, yelp_url, yelp_id, image_url,
  } = props;
  const [deletes, setDeletes] = useState([]);
  const info = {
    username,
    place,
    rating,
    range,
    address1,
    city,
    zipcode,
    state,
    yelp_url,
    yelp_id,
    image_url,

  };
  // eslint-disable-next-line no-shadow
  function removed(deletes) {
    console.log(deletes);
    try {
      fetch('/delete_favorites_dash', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(
          deletes,
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
      console.log(e);
    }
  }

  function handleClick() {
    setDeletes(info);
    removed(info);
  }
  console.log(deletes);
  return (

    <button type="button" onClick={() => handleClick()}>
      remove
    </button>

  );
}
export default Del;
