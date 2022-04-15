import React from 'react';
import { render } from '@testing-library/react';
import Mynavbar1 from '../Mynavbar1';
import '@testing-library/jest-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<Mynavbar1 searchButton={() => void 0} userLocation={""} />, div);
});
