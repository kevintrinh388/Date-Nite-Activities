import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function Button({ content }) {
  return (
    <StyledButton data-testid="buttontest">{content}</StyledButton>
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
