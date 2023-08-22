import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SortingPage } from './sorting-page';

describe('SortingPage Component', () => {
  test('correctly sorts an empty array', async () => {
    render(
      <MemoryRouter>
        <SortingPage />
      </MemoryRouter>
    );

    const ascendingButton = screen.getByText('По возрастанию');
    fireEvent.click(ascendingButton);

    const columns = screen.queryAllByTestId(/^column-\d+$/);
    expect(columns).toHaveLength(0);
  });

  test('correctly sorts an array with a single element', async () => {
    render(
      <MemoryRouter>
        <SortingPage />
      </MemoryRouter>
    );

    const buttonCreate = screen.getByText('Массив = 1');
    fireEvent.click(buttonCreate);

    const ascendingButton = screen.getByText('По возрастанию');
    fireEvent.click(ascendingButton);

    const columns = screen.queryAllByTestId(/^column-\d+$/);
    expect(columns).toHaveLength(1);
  });

  test('correctly sorts an array with a few elements', async () => {
    render(
      <MemoryRouter>
        <SortingPage />
      </MemoryRouter>
    );

    const buttonCreate = screen.getByText('Новый массив');
    fireEvent.click(buttonCreate);

    const ascendingButton = screen.getByText('По возрастанию');
    fireEvent.click(ascendingButton);

    
    await waitFor(() => {
      const columns = screen.queryAllByTestId(/^column-\d+$/);
      expect(columns.length).toBeGreaterThan(1);
    }, { timeout: 10000 });
  });
});
