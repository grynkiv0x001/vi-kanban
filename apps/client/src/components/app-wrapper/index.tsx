import type { ReactNode } from 'react';
import { Global } from '@emotion/react';

import { useAppSelector } from '@/hooks';

import { ShadowCaret } from '@/components/caret';
import { ThemeProvider } from '@/components/theme-provider';

import * as styles from './app-wrapper.styles';

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  const { enabled } = useAppSelector(state => state.vi);

  return (
    <ThemeProvider>
      <section css={styles.wrapper}>
        {enabled && (
          <ShadowCaret />
        )}
        <Global styles={styles.global} />
        {children}
      </section>
    </ThemeProvider>
  );
};
