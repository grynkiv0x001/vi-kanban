import { useSelector } from 'react-redux';

import type { RootState } from '@/store';

import { CreateListForm, CreateProjectForm, CreateTaskForm } from '@/components/form';

import * as styles from './create-modal.styles.ts';

export const CreateModal = () => {
  const { instance, formId } = useSelector((state: RootState) => state.modal);

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
      <footer>
        <button type="submit" form={formId}>Create</button>
      </footer>
    </section>
  );
};
