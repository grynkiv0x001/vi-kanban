import type { Middleware } from '@reduxjs/toolkit';

import { toggleVi } from '@/store/features/vi';
import { setTheme } from '@/store/features/app-settings';

export const localStorageMiddleware: Middleware = () => next => action => {
  const result = next(action);

  if (toggleVi.match(action)) {
    localStorage.setItem('vi-enabled', String(action.payload));
  }

  if (setTheme.match(action)) {
    localStorage.setItem('theme', String(action.payload));
  }

  return result;
};
