import './Auth.css';
import log from 'loglevel';
import React from 'react';
import { useGoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/google.svg';

const clientId = process.env.REACT_APP_CLIENT_ID;

function Logout() {
  const navigate = useNavigate();

  const onLogoutSuccess = () => {
    log.info('Successfully logged out');
    navigate('/landing');
  };

  const onFailure = () => {
    log.error('Failed to log out');
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <button type="submit" onClick={signOut} className="button">
      <img src={logo} alt="google login" className="icon" />
      <span className="buttonText">Sign out</span>
    </button>
  );
}

export default Logout;
