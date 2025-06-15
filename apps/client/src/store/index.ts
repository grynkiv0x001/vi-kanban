import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@/store/services/baseApi';

import viReducer from '@/store/features/vi/viSlice';
import projectReducer from '@/store/features/project/projectSlice';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    vi: viReducer,
    project: projectReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(baseApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
