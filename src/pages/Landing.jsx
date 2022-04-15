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
        <div className="col-lg-12">
          <div id="content">
            <h1>Welcome to Date Night Activities</h1>
            <h3>Because finding a date is hard enough, let us help you plan one</h3>
            <hr />
            <button type="button" onClick={home} className="btn btn-outline-light">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
