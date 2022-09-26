import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import results from '../tests/MockData/Data';
import userEvent from '@testing-library/user-event';

describe('Testing the Star Wars aplication', () => {
  test('Testing the header compenent', () => {
    render(<App />)
    expect(screen.getByRole('heading', {name: /Star Wars Database/i})).toBeInTheDocument();
    const planetFilterInput = screen.getByTestId(/name-filter/i)
    expect(planetFilterInput).toBeInTheDocument();
    userEvent.type(planetFilterInput, 'd');
    expect(planetFilterInput).toHaveValue('d');
  });
  test('Testing the PlanetList compenent', () => {
    render(<App />)
    console.log(results[0]);
    expect(screen.getByText(/Filtros:/i)).toBeInTheDocument();
    expect(screen.getAllByRole('option').length).toBe(8)
  });
});
