import { useSelector } from 'react-redux';

import type { List as ListPropType } from 'shared/src/types';

import { DeleteIcon, TrashIcon } from '@/assets/icons';

import type { RootState } from '@/store';
import { selectTasksByListId, useCreateTaskMutation, useDeleteTaskMutation } from '@/store/features/tasks';
import { useDeleteListMutation } from '@/store/features/lists';

import * as styles from './list.styles';

export const List = ({ id, projectId, name }: ListPropType) => {
  const [removeList, { isLoading }] = useDeleteListMutation();
  const [removeTask] = useDeleteTaskMutation();
  const [createTask] = useCreateTaskMutation();
  const tasks = useSelector((state: RootState) => selectTasksByListId(state, id));

  const handleListRemoval = async () => {
    removeList({ id, projectId });
  };

  const handleTaskRemoval = async (taskId: number) => {
    removeTask({ id: taskId, projectId, listId: id });
  };

  const handleTaskCreation = async () => {
    createTask({ projectId, listId: id, name: 'Test task' });
  };

  return (
    <dl css={styles.list}>
      <dt css={styles.head}>
        <span>{name}</span>
        <button css={styles.removeListBtn} onClick={handleListRemoval} disabled={isLoading}>
          <TrashIcon width={16} height={16} />
        </button>
      </dt>
      {tasks?.map((task) => (
        <dd key={task.id} css={styles.task}>
          {task.name}
          <button onClick={() => handleTaskRemoval(task.id)}>
            <DeleteIcon width={16} height={16} />
          </button>
        </dd>
      ))}
      <dd css={styles.createTaskBtn}>
        <button onClick={handleTaskCreation}>
          + Add task
        </button>
      </dd>
    </dl>
  );
};
