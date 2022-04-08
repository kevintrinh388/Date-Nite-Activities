import './Auth.css';
import log from 'loglevel';
import React, { useEffect, useState } from 'react';
import { useGoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import RouteConstants from '../../constants/RouteConstants';
import { CLIENT_ID, PROFILE_KEY } from '../../constants/AuthConstants';
import logo from '../../assets/google.svg';

function LogoutButton() {
  const [isAuthTypeGoogle, setAuthType] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const currentUserProfile = JSON.parse(localStorage.getItem(PROFILE_KEY));
      log.info('Detected google user: ', currentUserProfile);
      setAuthType(true);
    } catch (e) {
      log.info('No google profile information found');
    }
  }, []);

  const onLogoutSuccess = () => {
    log.info('Successfully logged out');
    navigate(RouteConstants.Login);
  };

  const onFailure = () => {
    log.error('Failed to log out');
  };

  const { signOut } = useGoogleLogout({
    clientId: CLIENT_ID,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <button type="submit" onClick={signOut} className="button">
      {isAuthTypeGoogle ? <img src={logo} alt="google login" className="icon" /> : null }
      <span className="buttonText">Sign out</span>
    </button>
  );
}

export default LogoutButton;
