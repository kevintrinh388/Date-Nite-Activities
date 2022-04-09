import React, { useState, useEffect } from 'react';
import Mynavbar2 from '../components/Mynavbar2';

function Dashboard() {
  const [favs, setFavs] = useState([]);
  useEffect(() => {
    fetch('/load_favs')
      .then((res) => res.json())
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
