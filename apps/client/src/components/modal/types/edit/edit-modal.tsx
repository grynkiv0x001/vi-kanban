import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';

import { closeModal } from '@/store/features/modal';
import { useDeleteTaskMutation } from '@/store/features/tasks';

import { Button } from '@/components/button';
import { EditTaskForm, EditTaskDetails } from '@/components/form';

import * as styles from './edit-modal.styles';

export const EditModal = () => {
  const dispatch = useAppDispatch();
  const { instance, formId, data } = useAppSelector(state => state.modal);

  const [deleteTask, { isLoading: isDeleting, isSuccess: isDeleteSuccess }] = useDeleteTaskMutation();

  useEffect(() => {
    if (isDeleteSuccess) {
      dispatch(closeModal());
    }
  }, [isDeleteSuccess, dispatch]);

  const handleDelete = async () => {
    if (!data || instance !== 'task') {
      return;
    }

    try {
      await deleteTask({ id: data.id, projectId: data.projectId, listId: data.listId }).unwrap();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const renderEditForm = () => {
    switch (instance) {
    case 'task':
      return <EditTaskForm />;
    }
  };

  const renderEditDetails = () => {
    switch (instance) {
    case 'task':
      return <EditTaskDetails />;
    default:
      return null;
    }
  };

  return (
    <div css={styles.modal}>
      <header>
        <h3>Edit {instance}</h3>
      </header>
      <section css={styles.section}>
        <main css={styles.main}>
          {renderEditForm()}
        </main>
        <aside css={styles.details}>
          <h4 css={styles.detailsTitle}>Details</h4>
          {renderEditDetails()}
        </aside>
      </section>
      <footer css={styles.footer}>
        {instance === 'task' && (
          <Button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            css={styles.deleteButton}
          >
            Delete
          </Button>
        )}
        <Button type="submit" form={formId}>Save</Button>
      </footer>
    </div>
  );
};
