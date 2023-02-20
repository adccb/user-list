import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('app', async () => {
  const { container } = render(<App />);

  await waitFor(() => {
    const users = screen.getAllByTestId('user-container')

    // ten per page
    expect(users.length).toBe(10)
  })
});
