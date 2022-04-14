import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function Button({ content }) {
  return (
    <div>
      <StyledButton data-testid="buttontest" form="login_form">{content}</StyledButton>
    </div>
  );
}

const StyledButton = styled.button`
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  width: 65%;
  height: 3rem;
  border: none;
  color: white;
  border-radius: 2rem;
  cursor: pointer;
`;

Button.defaultProps = {
  content: '',
};

Button.propTypes = {
  content: PropTypes.string,
};
