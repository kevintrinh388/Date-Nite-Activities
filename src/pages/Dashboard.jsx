/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { Card, Row, CardGroup } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Icon } from '@iconify/react';
import Rating from '@mui/material/Rating';
import Mynavbar from '../components/Mynavbar1/Mynavbar';
import './Pages.css';
import GoogleCalendar from '../components/GoogleCalendar';
import Del from '../components/Delete';
import {
  PROFILE_KEY,
} from '../constants/AuthConstants';

function Dashboard() {
  const [favs, setFavs] = useState([]);
  const currentUserProfile = JSON.parse(localStorage.getItem(PROFILE_KEY));
  // const username = currentUserProfile[NAME_KEY];

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
      <Mynavbar />
      <div>
        <div className="Dashboard">
          <Row xs={2} md={3} className="g-3">
            {favs.slice(0, -1).map((activity) => (
              <Container>
                <div className="Display">
                  <CardGroup>
                    <Card border="dark" style={{ width: '18rem', left: '70px' }}>
                      <Card.Img className="Image" variant="top" src={activity.image_url} />
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
                      <div className="Rating">
                        <Rating
                          name="read-only"
                          value={activity.rating}
                          readOnly
                          precision={0.5}
                        />
                      </div>
                      <Card.Text>{activity.range}</Card.Text>
                      <a href={activity.yelp_url} target="_blank" rel="noreferrer">
                        <Icon icon="simple-icons:yelp" width="20" height="30" />
                      </a>
                      <GoogleCalendar place={activity.place} />
                      <Del
                        username={activity.username}
                        place={activity.place}
                        rating={activity.rating}
                        range={activity.range}
                        address1={activity.address1}
                        city={activity.city}
                        state={activity.state}
                        zipcode={activity.zipcode}
                        yelp_id={activity.yelp_id}
                        yelp_url={activity.yelp_url}
                        image_url={activity.image_url}
                      />
                    </Card>
                  </CardGroup>
                </div>
              </Container>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
