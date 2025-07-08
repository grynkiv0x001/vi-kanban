import type { ReactElement }  from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router';

import { modalReducer } from '@/store/features';
import { baseApi } from '@/store/services/base.api';

import { ThemeProvider } from '@/components/theme-provider';

type Props = {
  Component: ReactElement;
  initialEntries?: string[];
}

export const renderWithProviders = ({ Component, initialEntries = ['/'] }: Props) => {
  const store = configureStore({
    reducer: {
      modal: modalReducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>
        <ThemeProvider>
          {Component}
        </ThemeProvider>
      </MemoryRouter>
    </Provider>,
  );
};
