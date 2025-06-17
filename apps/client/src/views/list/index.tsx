import type { List as ListPropType } from 'shared/src/types';

import { TrashIcon } from '@/assets/icons';

import { useDeleteListMutation } from '@/store/features/lists';

import * as styles from './list.styles';
import { useGetListTasksQuery } from '@/store/features/tasks';

export const List = ({ id, projectId, name }: ListPropType) => {
  const { data: tasks, isLoading: tasksLoading } = useGetListTasksQuery({ id, projectId });
  const [removeList, { isLoading }] = useDeleteListMutation();

  const handleListRemoval = async () => {
    removeList({ id, projectId });
  };

  return (
    <dl css={styles.list}>
      <dt css={styles.head}>
        <span>{name}</span>
        <button css={styles.removeListBtn} onClick={handleListRemoval} disabled={isLoading}>
          <TrashIcon width={16} height={16} />
        </button>
      </dt>
      {tasksLoading ? (
        <dd>Loading...</dd>
      ) : (
        <>
          {tasks?.map((task) => (
            <dd key={task.id} css={styles.task}>
              {task.name}
            </dd>
          ))}
        </>
      )}
    </dl>
  );
};
