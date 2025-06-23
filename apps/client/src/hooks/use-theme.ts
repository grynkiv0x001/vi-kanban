import { createContext, useContext } from 'react';

type ThemeName = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: ThemeName;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
