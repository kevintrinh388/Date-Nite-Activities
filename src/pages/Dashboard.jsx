import React, { useState, useEffect } from 'react';
import Mynavbar2 from '../components/Mynavbar2';
import { PROFILE_KEY } from '../constants/AuthConstants';

function Dashboard() {
  const [favs, setFavs] = useState([]);
  const currentUserProfile = JSON.parse(localStorage.getItem(PROFILE_KEY));

  useEffect(() => {
    fetch('/load_favs', {
      method: 'post',
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(
        currentUserProfile,
      ),
    }).then((res) => res.json())
      .then((data) => {
        const favsCopy = data;
        favsCopy.push(favs);
        setFavs(favsCopy);
        console.log(data);
      });
  }, []);
  return (
    <div>
      <Mynavbar2 />
      <div>
        {favs.map((activity) => (
          <h1>{activity.place}</h1>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
