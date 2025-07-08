import { useAppSelector } from '@/hooks';

import { CreateListForm, CreateProjectForm, CreateTaskForm } from '@/components/form';
import { Button } from '@/components/button';

import * as styles from './create-modal.styles';

export const CreateModal = () => {
  const { instance, formId } = useAppSelector(state => state.modal);

  const renderCreateForm = () => {
    switch (instance) {
    case 'project':
      return <CreateProjectForm />;
    case 'list':
      return <CreateListForm />;
    case 'task':
      return <CreateTaskForm />;
    }
  };

  return (
    <section css={styles.modal}>
      <header>
        <h3>Create {instance}</h3>
      </header>
      <main>
        {renderCreateForm()}
      </main>
      <footer css={styles.footer}>
        <Button type="submit" form={formId}>Create</Button>
      </footer>
    </section>
  );
};
