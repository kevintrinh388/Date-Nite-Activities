import './Auth.css';
import log from 'loglevel';
import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import logo from '../../assets/google.svg';
import refreshTokenSetup from '../../utils/refreshToken';
import RouteConstants from '../../constants/RouteConstants';
import 'react-toastify/dist/ReactToastify.css';
import { CLIENT_ID, PROFILE_KEY } from '../../constants/AuthConstants';

function GoogleContinueButton() {
  const navigate = useNavigate();

  function saveGoogleUser(currentUser) {
    console.log(currentUser);
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
      }).then((response) => response.json());
    } catch (e) {
      log.info('Failed to save google user');
    }
  }

  const onSuccess = (res) => {
    try {
      const currentUser = res.profileObj;
      saveGoogleUser(currentUser);
      log.info('Login Success: currentUser:', currentUser);
      localStorage.setItem(PROFILE_KEY, JSON.stringify(currentUser));
      refreshTokenSetup(res);
      navigate(RouteConstants.Landing);
    } catch (e) {
      log.error('There was a problem trying to save user information');
    }
  };

  const onFailure = (res) => {
    log.error('Login failed: res:', res);
    toast.error('Whoops.. There was a problem signing in', {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
    <>
      <button type="submit" onClick={signIn} className="button">
        <img src={logo} alt="google login" className="icon" />
        <span className="buttonText">Continue with Google</span>
      </button>
      <ToastContainer />
    </>
  );
}

export default GoogleContinueButton;
