import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const Themes = {
  SYSTEM: 'system',
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type Theme = typeof Themes[keyof typeof Themes];

interface IAppSettingsState {
  theme: Theme
}

const storedTheme = localStorage.getItem('theme') as Theme | null;

const initialState: IAppSettingsState = {
  theme: storedTheme || Themes.SYSTEM,
};

const appSettingsSlice = createSlice({
  name: 'app-settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<IAppSettingsState['theme']>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = appSettingsSlice.actions;

export default appSettingsSlice.reducer;
