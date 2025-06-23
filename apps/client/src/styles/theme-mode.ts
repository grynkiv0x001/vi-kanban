let currentMode: 'light' | 'dark' = 'light';

export const getThemeMode = () => currentMode;

export const setThemeMode = (mode: 'light' | 'dark') => {
  currentMode = mode;
};
