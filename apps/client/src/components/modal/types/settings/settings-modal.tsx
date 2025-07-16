import { useAppDispatch, useAppSelector } from '@/hooks';

import { closeModal } from '@/store/features/modal';

import { AppSettingsForm } from '@/components/form';
import { Button } from '@/components/button';

import * as styles from './settings-modal.styles';

export const SettingsModal = () => {
  const dispatch = useAppDispatch();
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
        <h3 css={styles.title}>{instance} settings</h3>
      </header>
      <main>
        {renderForm()}
      </main>
      <footer css={styles.footer}>
        <Button
          form={formId}
          onClick={() => dispatch(closeModal())}
        >
          Done
        </Button>
      </footer>
    </section>
  );
};
