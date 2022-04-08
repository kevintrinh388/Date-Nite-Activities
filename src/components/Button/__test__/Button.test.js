import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Button from '../ Button';
import '@testing-library/jest-dom';

afterEach(cleanup);
it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<Button />, div);
});

it('renders button correctly', () => {
  const { getByTestId } = render(<Button content="SIGN UP" />);
  expect(getByTestId('buttontest')).toHaveTextContent('SIGN UP');
});

it('matches snapshot', () => {
  const tree = render(<Button content="SIGN UP" />);
  expect(tree).toMatchSnapshot();
});
