import './Auth.css';
import log from 'loglevel';
import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/google.svg';
import refreshTokenSetup from '../../utils/refreshToken';

const clientId = process.env.REACT_APP_CLIENT_ID;

function Login() {
  const navigate = useNavigate();

  const onSuccess = (res) => {
    log.info('Login Success: currentUser:', res.profileObj);
    refreshTokenSetup(res);
    navigate('/home');
  };

  const onFailure = (res) => {
    log.error('Login failed: res:', res);
    navigate('/home');
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
    <button type="submit" onClick={signIn} className="button">
      <img src={logo} alt="google login" className="icon" />
      <span className="buttonText">Sign in with Google</span>
    </button>
  );
}

export default Login;
