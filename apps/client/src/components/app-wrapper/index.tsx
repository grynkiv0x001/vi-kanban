import type { ReactNode } from 'react';
import { Global } from '@emotion/react';

import * as styles from './app-wrapper.styles';

export const AppWrapper = ({ children }: { children: ReactNode }) => (
  <section css={styles.wrapper}>
    <Global styles={styles.global} />
    {children}
  </section>
);
