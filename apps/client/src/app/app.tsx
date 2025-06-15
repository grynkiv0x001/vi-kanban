import { Outlet } from 'react-router';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { KeyboardWrapper } from '@/components/keyboard-wrapper';

import * as styles from './app.styles.ts';

export const App = () => {
  return (
    <KeyboardWrapper>
      <Header />
      <section css={styles.app}>
        <Outlet />
        <Footer />
      </section>
    </KeyboardWrapper>
  );
};
