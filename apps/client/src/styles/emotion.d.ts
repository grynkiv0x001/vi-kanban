import '@emotion/react';

import type { lightColors } from './colors-light.styles';

declare module '@emotion/react' {
  export interface Theme {
    colors: typeof lightColors;
  }
}
