import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/store';

const selectTheme = (state: RootState) => state.appSettings.theme;
const selectFormId = (state: RootState) => state.modal.formId;
const selectViEnabled = (state: RootState) => state.vi.enabled;

export const useAppSettingsFormSelector = createSelector(
  [selectTheme, selectFormId, selectViEnabled],
  (theme, formId, enabled) => ({
    theme,
    formId,
    enabled,
  }),
);
