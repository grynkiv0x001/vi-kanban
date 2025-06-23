import { lightColors } from './colors-light.styles';
import { darkColors } from './colors-dark.styles';

import { getThemeMode } from './theme-mode';

type ColorKeys = keyof typeof lightColors;

export const theme = new Proxy({} as Record<ColorKeys, string>, {
  get(_, prop: string) {
    const mode = getThemeMode();
    const colors = mode === 'dark' ? darkColors : lightColors;
    
    return colors[prop as ColorKeys];
  },
});
