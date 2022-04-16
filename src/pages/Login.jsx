import log from 'loglevel';
import React, { useState } from 'react';
import './Pages.css';
import styled from 'styled-components';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ContinueButton from '../components/auth/ContinueButton';
import RouteConstants from '../constants/RouteConstants';
import { PROFILE_KEY } from '../constants/AuthConstants';

function Login() {
  const navigate = useNavigate();
  // const DEFAULT_IMAGE_URL = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  const TOAST_ERROR = 'TOAST_ERROR';
  const TOAST_SUCCESS = 'TOAST_SUCCESS';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // redirect to signup page
  const signUp = () => {
    navigate(RouteConstants.SignUp);
  };
  const showToast = (text, type) => {
    if (type === TOAST_ERROR) {
      toast.error(text, {
        toastId: 'error',
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success(text, {
        toastId: 'success',
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const validateFields = (e, p) => {
    if (e === null || p === null || e === '' || p === '') {
      showToast('Whoops.. Make sure your email and password are not empty', TOAST_ERROR);
      return false;
    }
    if (!validator.isEmail(e)) {
      showToast('Whoops.. Make sure you enter a valid email', TOAST_ERROR);
      return false;
    }
    return true;
  };

  const onEmailChange = (e) => {
    setEmail(e.target?.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target?.value);
  };

  const logIn = () => {
    if (validateFields(email, password)) {
      const user = { email };
      try {
        fetch('/login_user', {
          method: 'post',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(
            user,
          ),
        }).then((response) => {
          console.log(response);
          if (response.status === 200) {
            showToast('Successfully logged in!', TOAST_SUCCESS);
            response.json().then((data) => {
              localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
            });
            navigate(RouteConstants.Landing);
          } else if (response.status === 202) {
            showToast('Google Users: Please use the other door', TOAST_ERROR);
          } else {
            showToast('Looks like the user does not exist... please try to Sign Up', TOAST_ERROR);
          }
        });
      } catch (e) {
        log.info('Failed to Sign In');
        showToast('Whoops.. Something went wrong', TOAST_ERROR);
      }
    }
  };

  return (
    <div className="Login">
      <MainContainer>
        <WelcomeText>Log in</WelcomeText>
        <Text onClick={signUp}>Don&apos;t have an account? Sign up</Text>
        <InputContainer>
          <input className="styledInput" id="email" type="text" placeholder="Email" onChange={onEmailChange} />
          <input className="styledInput" id="password" type="password" placeholder="Password" onChange={onPasswordChange} />
        </InputContainer>
        <ButtonContainer>
          <button className="styledButton" type="button" onClick={logIn}>Login</button>
        </ButtonContainer>
        <LoginWith>OR</LoginWith>
        <HorizontalRule />
        <ContinueButton />
        <Text>Forgot password?</Text>
      </MainContainer>
    </div>
  );
}

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: scroll;
  position: relative;
  width: 30%;
  height: 80%;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }
  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 80vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 80vh;
  }
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`;

const InputContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginWith = styled.h5`
  cursor: pointer;
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

const Text = styled.h4`
  cursor: pointer;
`;

export default Login;
