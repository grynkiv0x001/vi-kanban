import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@/store/services/base.api';

import {
  modalReducer,
  projectsReducer,
  tasksReducer,
  viReducer,
} from '@/store/features';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    modal: modalReducer,
    project: projectsReducer,
    tasks: tasksReducer,
    vi: viReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(baseApi.middleware);
  },
});

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
