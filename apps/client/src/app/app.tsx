import { Outlet } from 'react-router';

import { useViAutoIndexing } from '@/hooks/useViAutoIndexing';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { AppWrapper } from '@/components/app-wrapper';
import { KeyboardWrapper } from '@/components/keyboard-wrapper';
import { ModalWrapper } from '@/components/modal';

export const App = () => {
  useViAutoIndexing();

  return (
    <KeyboardWrapper>
      <AppWrapper>
        <Header />
        <Outlet />
        <Footer />
        <ModalWrapper />
      </AppWrapper>
    </KeyboardWrapper>
  );
};
