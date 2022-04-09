import React, { useState, useEffect } from 'react';
import { Card, Row } from 'react-bootstrap';
import { Icon } from '@iconify/react';
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
        <Row xs={1} md={2} className="g-4">
          {favs.map((activity) => (
            <div>
              {/* <h1>{activity.place}</h1> */}
              <Card border="dark" style={{ width: '18rem', left: '70px' }}>
                <Card.Img variant="top" src={activity.image_url} />
                <Card.Title>{activity.place}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {activity.address}
                  ,
                  {activity.city}
                  ,
                  {activity.state}
                  ,
                  {activity.zipcode}
                </Card.Subtitle>
                <Card.Text>{activity.rating}</Card.Text>
                <Card.Text>{activity.range}</Card.Text>

                <br />
                <a href={activity.yelp_url} target="_blank" rel="noreferrer">
                  <Icon icon="simple-icons:yelp" width="20" height="30" />

                </a>

              </Card>
            </div>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Dashboard;
