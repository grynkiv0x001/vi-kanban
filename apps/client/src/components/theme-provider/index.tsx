import React, { createContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';

import { useAppSelector } from '@/hooks';

import { type Theme, Themes } from '@/store/features/app-settings';

import { lightColors } from '@/styles/colors-light.styles';
import { darkColors } from '@/styles/colors-dark.styles';
import { setThemeMode } from '@/styles/theme-mode';

type ResolvedTheme = Exclude<Theme, 'system'>;

interface ThemeContextValue {
  resolvedTheme: ResolvedTheme;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useAppSelector((state) => state.appSettings);

  const getSystemTheme = (): ResolvedTheme =>
    window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(
    theme === Themes.SYSTEM ? getSystemTheme() : theme,
  );

  useEffect(() => {
    if (theme !== Themes.SYSTEM) {
      setResolvedTheme(theme);
      return;
    }

    const updateTheme = () => {
      setResolvedTheme(getSystemTheme());
    };

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', updateTheme);
    updateTheme();

    return () => mq.removeEventListener('change', updateTheme);
  }, [theme]);

  useEffect(() => {
    setThemeMode(resolvedTheme);
  }, [resolvedTheme]);

  const selectedTheme = useMemo(() => {
    return resolvedTheme === 'dark' ? { ...darkColors } : { ...lightColors };
  }, [resolvedTheme]);

  return (
    <ThemeContext.Provider value={{ resolvedTheme }}>
      <EmotionThemeProvider theme={{ colors: selectedTheme }}>
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};
