import { describe, test, expect } from 'vitest';
import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/tests';

import { Home } from '@/app/pages/home';

describe('<Home />', () => {
  test('render homepage with proper navigation', async () => {
    renderWithProviders({
      Component: <Home />,
      initialEntries: ['/'],
    });

    const link = screen.getByText('Projects');

    expect(link).toHaveAttribute('href', '/projects');
  });
});
