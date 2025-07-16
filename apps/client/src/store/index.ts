import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@/store/services/base.api';

import {
  appSettingsReducer,
  modalReducer,
  projectsReducer,
  tasksReducer,
  viReducer,
} from '@/store/features';
import { localStorageMiddleware } from '@/store/middlewares';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    appSettings: appSettingsReducer,
    modal: modalReducer,
    project: projectsReducer,
    tasks: tasksReducer,
    vi: viReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      baseApi.middleware,
      localStorageMiddleware,
    ]);
  },
});

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
