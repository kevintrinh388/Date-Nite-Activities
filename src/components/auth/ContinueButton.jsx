import './Auth.css';
import log from 'loglevel';
import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/google.svg';
import refreshTokenSetup from '../../utils/refreshToken';
import RouteConstants from '../../constants/RouteConstants';
import 'react-toastify/dist/ReactToastify.css';
import { CLIENT_ID, PROFILE_KEY } from '../../constants/AuthConstants';
import showToast, { TOAST_ERROR, TOAST_SUCCESS } from '../../utils/toastHelper';

function GoogleContinueButton() {
  const navigate = useNavigate();

  function saveGoogleUser(currentUser) {
    try {
      fetch('/save_google_user', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(
          currentUser,
        ),
      }).then((response) => {
        if (response.status === 200) {
          showToast('Successfully logged in!', TOAST_SUCCESS);
          response.json().then((data) => {
            localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
          });
          navigate(RouteConstants.Landing);
        }
      });
    } catch (e) {
      log.info('Failed to save google user');
    }
  }

  const onSuccess = (res) => {
    try {
      const options = {
        scope: 'https://www.googleapis.com/auth/calendar',
      };
      res.grant(options);
      res.grantOfflineAccess(options);
      localStorage.setItem('accessToken', res.accessToken);
      const currentUser = res.profileObj;
      saveGoogleUser(currentUser);
      log.info('Login Success: currentUser:', currentUser);
      refreshTokenSetup(res);
      showToast('Successfully signed in!', TOAST_SUCCESS);
      navigate(RouteConstants.Landing);
    } catch (e) {
      log.error('There was a problem trying to save user information');
    }
  };

  const onFailure = (res) => {
    log.error('Login failed: res:', res);
    showToast('Whoops.. There was a problem signing in', TOAST_ERROR);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: CLIENT_ID,
    isSignedIn: true,
    accessType: 'offline',
    prompt: 'consent',
  });

  return (
    <button type="submit" onClick={signIn} className="button">
      <img src={logo} alt="google login" className="icon" />
      <span className="buttonText">Continue with Google</span>
    </button>
  );
}

export default GoogleContinueButton;
