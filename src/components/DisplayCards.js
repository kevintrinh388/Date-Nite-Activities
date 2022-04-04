/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Icon } from '@iconify/react';

export function DisplayCards(props) {

  return (
      <div>
    {props.activities.map((activities) => (
        <div className="activity_list">

          <Card border='dark' style={{ width: "18rem", left: "70px" }}>
            <Card.Img variant="top" src={activities.image_url} />
            <Card.Body>
              <Card.Title>{activities.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {activities.location.address1},{activities.location.city},
                {activities.location.state},{activities.location.zip_code}
              </Card.Subtitle>
              <Card.Text>{activities.rating}</Card.Text>
              <Card.Text>{activities.price}</Card.Text>
              <Button
                variant="primary"
                size="sm"
                onClick={() =>
                  props.updateMap(
                    activities.name.split(" ")[0] +
                      " " +
                      activities.location.address1
                  )
                }
              >
                Click to view on map
              </Button>
              <br/>
              <a href={activities.url} target="_blank" ><Icon icon="simple-icons:yelp" width="20" height="30" /> </a>
              <a href={activities.url} target="_blank" ><Icon icon="akar-icons:heart" width='30' height='30' /> </a>
            </Card.Body>
          </Card>
          <br />
        </div>
      ))}
    </div>
  );
}