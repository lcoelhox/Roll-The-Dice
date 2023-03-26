import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import App from '../App';

jest.mock('axios');

describe('Testing App component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  test('Render buttons sucess', () => {
    render(<App />);

    expect(screen.getByText('D4')).toBeInTheDocument();
    expect(screen.getByText('D6')).toBeInTheDocument();
    expect(screen.getByText('D9')).toBeInTheDocument();
    expect(screen.getByText('D20')).toBeInTheDocument();
    expect(screen.getByText('D100')).toBeInTheDocument();
  });

  test('clicking on the button to roll a dice calls the API and displays the result', async () => {
    axios.post.mockResolvedValueOnce({ data: { result: 5 } });

    render(<App />);

    fireEvent.click(screen.getByText('D6'));
    fireEvent.click(screen.getByText('Roll'));

    expect(await screen.findByText('Result: 5')).toBeInTheDocument();
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/roll', { sides: 6 });
  });

  test('displays rolled dice history', async () => {
    axios.post.mockResolvedValueOnce({ data: { result: 2 } });

    render(<App />);

    fireEvent.click(screen.getByText('D4'));
    fireEvent.click(screen.getByText('Roll'));

    expect(await screen.findByText('Result: 2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('D6'));
    fireEvent.click(screen.getByText('Roll'));

    expect(await screen.findByText('Result: 2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('D9'));
    fireEvent.click(screen.getByText('Roll'));

    expect(await screen.findByText('Result: 2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Clear'));

    expect(screen.queryByText('Result 1: 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Result 2: 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Result 3: 2')).not.toBeInTheDocument();
  });
});
