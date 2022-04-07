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

const clientId = process.env.REACT_APP_CLIENT_ID;

function GoogleContinueButton() {
  const navigate = useNavigate();

  const onSuccess = (res) => {
    log.info('Login Success: currentUser:', res.profileObj);
    refreshTokenSetup(res);
    navigate(RouteConstants.Home);
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
    clientId,
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
