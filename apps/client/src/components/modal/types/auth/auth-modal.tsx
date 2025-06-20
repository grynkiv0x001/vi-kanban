import { useAppSelector } from '@/hooks';

import { LoginForm, RegisterForm } from '@/components/form';

import * as styles from './auth-modal.styles';

export const AuthModal = () => {
  const { instance, formId } = useAppSelector(state => state.modal);

  const renderAuthForm = () => {
    switch (instance) {
    case 'register':
      return <RegisterForm />;
    case 'login':
      return <LoginForm />;
    }
  };

  return (
    <section css={styles.modal}>
      <header>
        <h3 css={styles.title}>{instance}</h3>
      </header>
      <main>
        {renderAuthForm()}
      </main>
      <footer>
        <button type="submit" form={formId}>Continue</button>
      </footer>
    </section>
  );
};
