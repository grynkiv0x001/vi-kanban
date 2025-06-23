import React, { createContext, useEffect, useState } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';

import { lightColors } from '@/styles/colors-light.styles';
import { darkColors } from '@/styles/colors-dark.styles';
import { setThemeMode } from '@/styles/theme-mode';

type ThemeName = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: ThemeName;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getSystemTheme = () =>
    window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  const [theme, setTheme] = useState<ThemeName>(() => {
    const stored = localStorage.getItem('theme') as ThemeName | null;
    return stored ?? 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(
    theme === 'system' ? getSystemTheme() : theme,
  );

  useEffect(() => {
    const updateTheme = () => {
      const newResolved = theme === 'system' ? getSystemTheme() : theme;
      setResolvedTheme(newResolved);
    };

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener('change', updateTheme);
      updateTheme();
      return () => mq.removeEventListener('change', updateTheme);
    } else {
      updateTheme();
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    setThemeMode(resolvedTheme);
  }, [resolvedTheme]);

  const selectedTheme = resolvedTheme === 'dark' ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      <EmotionThemeProvider theme={{ colors: selectedTheme }}>
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};
