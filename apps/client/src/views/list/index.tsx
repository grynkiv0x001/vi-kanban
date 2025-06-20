import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { List as ListPropType } from 'shared/src/types';

import { TrashIcon } from '@/assets/icons';

import type { RootState } from '@/store';
import { openModal } from '@/store/features/modal';
import { selectTasksByListId } from '@/store/features/tasks';
import { useDeleteListMutation, useUpdateListMutation } from '@/store/features/lists';

import { Task } from '@/views/task';

import * as styles from './list.styles';

export const List = (list: ListPropType) => {
  const { id, projectId, name } = list;

  const dispatch = useDispatch();
  const [removeList, { isLoading }] = useDeleteListMutation();
  const [updateList, { isLoading: updating }] = useUpdateListMutation();

  const tasks = useSelector((state: RootState) => selectTasksByListId(state, id));

  const [listName, setListName] = useState<string>(name);

  useEffect(() => {
    setListName(name);
  }, [name]);

  const handleBlur = async () => {
    if (listName === name) {
      return;
    }

    try {
      await updateList({ ...list, name: listName }).unwrap();
    } catch (error) {
      console.error('Failed to rename list:', error);
    }
  };

  const handleListRemoval = async () => {
    removeList({ id, projectId });
  };

  const handleTaskCreation = async () => {
    dispatch(openModal({
      type: 'create',
      instance: 'task',
      ids: {
        listId: id,
      },
    }));
  };

  return (
    <dl css={styles.list}>
      <dt css={styles.head}>
        <input
          required
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          onBlur={handleBlur}
          disabled={updating}
          css={styles.name}
        />
        <button css={styles.removeListBtn} onClick={handleListRemoval} disabled={isLoading}>
          <TrashIcon width={16} height={16} />
        </button>
      </dt>
      {tasks?.map((task) => (
        <Task key={task.id} {...task} />
      ))}
      <dd css={styles.createTaskBtn}>
        <button onClick={handleTaskCreation}>
          + Add task
        </button>
      </dd>
    </dl>
  );
};
