import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the dice buttons and roll button', () => {
    render(<App />);

    expect(screen.getByAltText('D4')).toBeInTheDocument();
    expect(screen.getByAltText('D6')).toBeInTheDocument();
    expect(screen.getByAltText('D9')).toBeInTheDocument();
    expect(screen.getByAltText('D20')).toBeInTheDocument();
    expect(screen.getByAltText('D100')).toBeInTheDocument();
    expect(screen.getByText('Roll')).toBeInTheDocument();
  });

  it('changes the selected dice and shows the dice image when the dice buttons are clicked', () => {
    render(<App />);

    fireEvent.click(screen.getByAltText('D4'));
    expect(screen.getByAltText('D4')).toHaveClass('active');
    fireEvent.click(screen.getByAltText('D6'));
    expect(screen.getByAltText('D6')).toHaveClass('active');
    fireEvent.click(screen.getByAltText('D20'));
    expect(screen.getByAltText('D20')).toHaveClass('active');
  });

  it('rolls the dice and shows the result when the roll button is clicked', async () => {
    const mockRollResponse = { data: { result: 10 } };
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockRollResponse),
    });

    render(<App />);

    fireEvent.click(screen.getByAltText('D4'));
    fireEvent.click(screen.getByText('Roll'));

    await screen.findByText('Result: 10');
    expect(screen.getByText('Result: 10')).toHaveClass('roll-result');
    expect(screen.getByText('Result 1: 10')).toBeInTheDocument();

    // Limpando o mock
    global.fetch.mockRestore();
  });
});
