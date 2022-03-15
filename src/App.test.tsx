import React from 'react';
import { render, screen, act} from '@testing-library/react';
import App from './App';
import axios, { AxiosResponse } from 'axios';
import '@testing-library/jest-dom/extend-expect';

// mock data
const mockData = {
  data: {
    results: [
      {
        name: 'Mock Vader',
        films: [
          "https://swapi.dev/api/films/1/",
          "https://swapi.dev/api/films/2/",
          "https://swapi.dev/api/films/3/"
       ]
      }
    ]
  }
};

describe('App', () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  })

  test('should render with loading', () => {
    render(<App />);
    const loadingElement = screen.getByText(/...loading/i);
    expect(loadingElement).toBeInTheDocument();
  });

  test('should load data with initial api call', async () => {
    const mAxiosResponse = mockData as AxiosResponse;
    jest.spyOn(axios, 'get').mockResolvedValueOnce(mAxiosResponse);
    render(<App />);
    expect(screen.getByText('...loading')).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(await screen.findByText('Mocks Vader')).toBeInTheDocument();
  });
});
