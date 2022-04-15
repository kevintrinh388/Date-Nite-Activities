import React from 'react';
import './Pages.css';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ContinueButton from '../components/auth/ContinueButton';
import Button from '../components/Button/ Button';
import Input from '../components/Input';
import RouteConstants from '../constants/RouteConstants';

function Login() {
  const navigate = useNavigate();

  const signUp = () => {
    navigate(RouteConstants.SignUp);
  };

  return (
    <div className="Login">
      <MainContainer>
        <WelcomeText>Log in</WelcomeText>
        <Text onClick={signUp}>Don&apos;t have an account? Sign up</Text>
        <InputContainer>
          <Input type="text" placeholder="Email" />
          <Input type="password" placeholder="Password" />
        </InputContainer>
        <ButtonContainer>
          <Button content="LOG IN" />
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
