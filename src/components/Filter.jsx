/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Filter(props) {
  return (
    <Modal
      {...props}
      size="md-down"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Filters To Your Search
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="filter">
          <select
            name="type"
            id="type"
            onChange={(e) => {
              props.searchTerm.current = e.target.value;
              console.log(props.searchTerm);
            }}
          >
            <option value="Restaurant">Restaurant</option>
            <option value="Activity">Activity</option>
          </select>

          <select
            name="rating"
            id="rating"
            onChange={(e) => {
              props.searchRating.current = e.target.value;
              console.log(props.searchRating);
            }}
          >
            <option value="1"> 1 and up </option>
            <option value="2"> 2 and up </option>
            <option value="3"> 3 and up </option>
            <option value="4"> 4 and up </option>
            <option value="5"> 5 </option>
          </select>

          <select
            name="price"
            id="price"
            onChange={(e) => {
              props.searchPrice.current = e.target.value;
              console.log(props.searchPrice);
            }}
          >
            <option value="1,2,3,4"> $-$$$$ </option>
            <option value="1,2,3"> $-$$$ </option>
            <option value="1,2"> $-$$ </option>
            <option value="1"> $ </option>
          </select>

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
        <Button variant="primary" onClick={props.onHide}>
          Sumbit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Filter;
