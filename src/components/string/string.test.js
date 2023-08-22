import { render, screen, fireEvent, waitFor, queryByText  } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { StringComponent } from "./string";

describe("String Component", () => {
  test("correctly reverses a string with even number of characters", async () => {
    render(
      <MemoryRouter>
        <StringComponent />
      </MemoryRouter>
    );

    const inputElement = screen.getByTestId("input");
    const buttonElement = screen.getByText("Развернуть");

    fireEvent.change(inputElement, { target: { value: "hello" } });
    fireEvent.click(buttonElement);

    const circleElements = screen.getAllByTestId(/^circle-\d+$/);
    expect(circleElements).toHaveLength(5);
    
    await waitFor(async () => {
      const circleComponent1 = queryByText(circleElements[0], 'o');
      expect(circleComponent1).toBeInTheDocument();

      const circleComponent2 = queryByText(circleElements[1], 'l');
      expect(circleComponent2).toBeInTheDocument();

      const circleComponent3 = queryByText(circleElements[2], 'l');
      expect(circleComponent3).toBeInTheDocument();

      const circleComponent4 = queryByText(circleElements[3], 'e');
      expect(circleComponent4).toBeInTheDocument();

      const circleComponent5 = queryByText(circleElements[4], 'h');
      expect(circleComponent5).toBeInTheDocument();
    }, { timeout: 20000 });
  });

  test("correctly reverses a string with not even number of characters", async () => {
    render(
      <MemoryRouter>
        <StringComponent />
      </MemoryRouter>
    );

    const inputElement = screen.getByTestId("input");
    const buttonElement = screen.getByText("Развернуть");

    fireEvent.change(inputElement, { target: { value: "good" } });
    fireEvent.click(buttonElement);

    const circleElements = screen.getAllByTestId(/^circle-\d+$/);
    expect(circleElements).toHaveLength(4);
    
    await waitFor(async () => {
      const circleComponent1 = queryByText(circleElements[0], 'd');
      expect(circleComponent1).toBeInTheDocument();

      const circleComponent2 = queryByText(circleElements[1], 'o');
      expect(circleComponent2).toBeInTheDocument();

      const circleComponent3 = queryByText(circleElements[2], 'o');
      expect(circleComponent3).toBeInTheDocument();

      const circleComponent4 = queryByText(circleElements[3], 'g');
      expect(circleComponent4).toBeInTheDocument();
    }, { timeout: 20000 });
  });

  test('correctly reverses a string with a single character', async () => {
    render(
      <MemoryRouter>
        <StringComponent />
      </MemoryRouter>
    );

    const inputElement = screen.getByTestId('input');
    const buttonElement = screen.getByText('Развернуть');

    fireEvent.change(inputElement, { target: { value: 'a' } });
    fireEvent.click(buttonElement);

    const circleElements = screen.getAllByTestId(/^circle-\d+$/);
    expect(circleElements).toHaveLength(1);

    await waitFor(async () => {
      const circleComponent1 = queryByText(circleElements[0], 'a');
      expect(circleComponent1).toBeInTheDocument();
    }, { timeout: 20000 });
  });

  test('correctly handles an empty string', async () => {
    render(
      <MemoryRouter>
        <StringComponent />
      </MemoryRouter>
    );

    const inputElement = screen.getByTestId('input');
    const buttonElement = screen.getByText('Развернуть');

    fireEvent.change(inputElement, { target: { value: '' } });
    fireEvent.click(buttonElement);

    const circleElements = screen.queryAllByTestId(/^circle-\d+$/);
    expect(circleElements).toHaveLength(0);

    await waitFor(() => {
      expect(circleElements.length).toBe(0);
    }, { timeout: 20000 });
  });
});
