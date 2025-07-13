import { useAppSelector } from '@/hooks';

import { AppSettingsForm } from '@/components/form';
import { Button } from '@/components/button';

import * as styles from './settings-modal.styles';

export const SettingsModal = () => {
  const { instance, formId } = useAppSelector(state => state.modal);

  const renderForm = () => {
    switch (instance) {
    case 'app':
      return <AppSettingsForm />;
    }
  };

  return (
    <section css={styles.modal}>
      <header>
        <h3>Create {instance}</h3>
      </header>
      <main>
        {renderForm()}
      </main>
      <footer css={styles.footer}>
        <Button type="submit" form={formId}>Create</Button>
      </footer>
    </section>
  );
};
