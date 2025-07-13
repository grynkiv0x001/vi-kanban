import type { ReactNode } from 'react';
import { Global } from '@emotion/react';

import { Caret } from '@/components/caret';
import { ThemeProvider } from '@/components/theme-provider';

import * as styles from './app-wrapper.styles';

export const AppWrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>
    <section css={styles.wrapper}>
      <Caret />
      <Global styles={styles.global} />
      {children}
    </section>
  </ThemeProvider>
);
