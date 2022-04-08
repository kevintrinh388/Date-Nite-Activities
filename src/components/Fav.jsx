/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

function Fav() {
  const [data, setFavs] = useState([]);

  function handleDelete(i) {
    setFavs([...data.slice(0, i), ..data.slice(i + 1)]);
  }

  function Save() {
    fetch('/add_to_reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      // eslint-disable-next-line no-shadow
      .then((data) => {
        console.log(data);
      });
  }
  const favorites = data.map(
    (favoriote, i) => (
      <Favorite
        username={favorite.username}
        rating={favorite.rating}
        place={favorite.place}
        range={favorite.range}
        yelp_url={favorite.yelp_url}
        onDelete={() => handleDelete(i)}

      />
    ));

  useEffect(() => {
    fetch('/add_to_reviews', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      // eslint-disable-next-line no-shadow
      .then((data) => {
        setFavs(data);
      });
  }, []);
  return (
    <a href="#" onClick={() => { console.log('hi'); }}>
      <Icon icon="akar-icons:heart" width="30" height="30" />

    </a>
  );
}

export default Fav;
