import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Icon } from '@iconify/react';

function DisplayCards(props) {
  const { activities, updateMap } = props;
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
                  } ${
                    activity.location.address1}`,
                )}
              >
                Click to view on map
              </Button>
              <br />
              <a href={activity.url} target="_blank" rel="noreferrer">
                <Icon icon="simple-icons:yelp" width="20" height="30" />
                {' '}
              </a>
              <a href={activity.url} target="_blank" rel="noreferrer">
                <Icon icon="akar-icons:heart" width="30" height="30" />
                {' '}
              </a>
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
