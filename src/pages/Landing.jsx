import React from 'react';
import { useNavigate } from 'react-router-dom';
import RouteConstants from '../constants/RouteConstants';
import './Pages.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Landing() {
  const navigate = useNavigate();

  const home = () => {
    navigate(RouteConstants.Home);
  };

  return (
    <div className="Landing">
      <div className="row">
        <div className="col-lg">
          <div id="content">
            <h1>Welcome to Date Nite Activities</h1>
            <h3>Because finding a date is hard enough, let us help you plan one</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-sm" />
          <div className="col-sm">
            <hr />
            <h2>About Us</h2>
            <p>
              Hi! We are Kevin, Nadia, Nivin, Shubhada, and Yalini:
              A team of five students from Georgia State University.
              This app was created as a project for our Software Engineering class.
            </p>
          </div>
          <div className="col-sm" />
        </div>
        <div className="row">
          <div className="col-sm" />
          <div className="col-sm">
            <h2>Motivation</h2>
            <p>
              We created this app as a means to help people explore places
              with others. We hope that we can take the difficulty out of planning
              events.
            </p>
          </div>
          <div className="col-sm" />
        </div>
        <div className="row">
          <div className="col-sm" />
          <div className="col-sm">
            <h2>What is Date Nite Activities?</h2>
            <p>
              Date Nite Activities is a planning tool to help people organize dates,
              whether that be a romantic interest or just a friend.
              This is a centralized place for you and your date to look at restaurants
              and activities and hopefully pick out your favorites!
            </p>
            <hr />
          </div>
          <div className="col-sm" />
        </div>
        <div className="row">
          <div className="col-sm">
            <button type="button" onClick={home} className="btn btn-light">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
