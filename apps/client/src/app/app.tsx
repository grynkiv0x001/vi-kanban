import { Outlet } from 'react-router';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { AppWrapper } from '@/components/app-wrapper';
import { KeyboardWrapper } from '@/components/keyboard-wrapper';

export const App = () => {
  return (
    <KeyboardWrapper>
      <AppWrapper>
        <Header />
        <Outlet />
        <Footer />
      </AppWrapper>
    </KeyboardWrapper>
  );
};
