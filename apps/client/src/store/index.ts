import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@/store/services/base.api';

import {
  projectsReducer,
  tasksReducer,
  viReducer,
} from '@/store/features';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    vi: viReducer,
    project: projectsReducer,
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(baseApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
