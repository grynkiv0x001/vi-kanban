import type { ReactElement }  from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { modalReducer } from '@/store/features';
import { baseApi } from '@/store/services/base.api';
import { MemoryRouter } from 'react-router';

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
        {Component}
      </MemoryRouter>
    </Provider>,
  );
};
