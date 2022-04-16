import React from 'react';
import { render } from '@testing-library/react';
import Mynavbar from '../Mynavbar';
import '@testing-library/jest-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<Mynavbar />, div);
});
