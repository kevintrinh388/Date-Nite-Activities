import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Comp.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Icon } from '@iconify/react';
import Fav from './Fav';
import {
  NAME_KEY, PROFILE_KEY,
} from '../constants/AuthConstants';

function DisplayCards(props) {
  const { activities, updateMap } = props;
  const currentUserProfile = JSON.parse(localStorage.getItem(PROFILE_KEY));
  const username = currentUserProfile[NAME_KEY];

  return (
    <div>
      {
        activities.map((activity) => (
          <div className="activity_list">
            <Card border="dark" style={{ width: '18rem', left: '70px' }}>
              <Card.Img variant="top" src={activity.image_url} />
              <Card.Body>
                <Card.Title>{activity.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {activity.location.address1}
                  ,
                  {activity.location.city}
                  ,
                  {activity.location.state}
                  ,
                  {activity.location.zip_code}
                </Card.Subtitle>
                <Card.Text>{activity.rating}</Card.Text>
                <Card.Text>{activity.price}</Card.Text>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => updateMap(
                    `${activity.name.split(' ')[0]
                    } ${activity.location.address1}`,
                  )}
                >
                  Click to view on map
                </Button>
                <br />
                <div className="link_buttons">
                  <a href={activity.url} target="_blank" rel="noreferrer">
                    <Icon className="yelpy" icon="simple-icons:yelp" width="30" height="40" />
                  </a>
                  <Fav
                    place={activity.name}
                    username={username}
                    rating={activity.rating}
                    price={activity.price}
                    activityId={activity.id}
                    address={activity.location.address1}
                    city={activity.location.city}
                    state={activity.location.state}
                    zipCode={activity.location.zip_code}
                    yelpUrl={activity.url}
                    imageUrl={activity.image_url}
                  />
                </div>
              </Card.Body>
            </Card>
            <br />
          </div>
        ))
      }
    </div>
  );
}

DisplayCards.propTypes = {
  activities: PropTypes.instanceOf(Array).isRequired,
  updateMap: PropTypes.func.isRequired,
};

export default DisplayCards;
