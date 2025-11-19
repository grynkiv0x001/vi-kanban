import { useAppSelector } from '@/hooks';

import { Button } from '@/components/button';
import { EditTaskForm } from '@/components/form';

import * as styles from './edit-modal.styles';

export const EditModal = () => {
  const { instance, formId } = useAppSelector(state => state.modal);

  const renderEditForm = () => {
    switch (instance) {
    case 'task':
      return <EditTaskForm />;
    }
  };

  return (
    <section css={styles.modal}>
      <header>
        <h3>Edit {instance}</h3>
      </header>
      <main>
        {renderEditForm()}
      </main>
      <footer css={styles.footer}>
        <Button type="submit" form={formId}>Save</Button>
      </footer>
    </section>
  );
};
