import type { ReactNode } from 'react';
import { Global } from '@emotion/react';

import { ThemeProvider } from '@/components/theme-provider';

import * as styles from './app-wrapper.styles';

export const AppWrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>
    <section css={styles.wrapper}>
      <Global styles={styles.global} />
      {children}
    </section>
  </ThemeProvider>
);
