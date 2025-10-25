import { useEffect, useState } from 'react';

import type { List as ListPropType } from 'shared/src/types';

import { TrashIcon } from '@/assets/icons';

import { useAppDispatch, useAppSelector } from '@/hooks';

import { openModal } from '@/store/features/modal';
import { selectTasksByListId, useUpdateTaskMutation } from '@/store/features/tasks';
import { useDeleteListMutation, useUpdateListMutation } from '@/store/features/lists';

import { Task } from '@/views/task';

import { Button } from '@/components/button';
import { Input } from '@/components/input';

import * as styles from './list.styles';

export const List = (list: ListPropType) => {
  const { id, projectId, name } = list;

  const [updateTask] = useUpdateTaskMutation();
  const [removeList, { isLoading }] = useDeleteListMutation();
  const [updateList, { isLoading: updating }] = useUpdateListMutation();

  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => selectTasksByListId(state, id));

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
    await removeList({ id, projectId });
  };

  const handleTaskCreation = () => {
    dispatch(openModal({
      type: 'create',
      instance: 'task',
      ids: {
        listId: id,
      },
    }));
  };

  const handleTaskDrop = async (e: React.DragEvent<HTMLElement>) => {
    const data = e.dataTransfer.getData('application/json');

    await updateTask({ ...JSON.parse(data), listId: id });
  };

  return (
    <dl
      css={styles.list}
      onDrop={handleTaskDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <dt css={styles.head}>
        <Input
          required
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          onBlur={handleBlur}
          disabled={updating}
          css={styles.name}
          variant="secondary"
        />
        <button css={styles.removeListBtn} onClick={handleListRemoval} disabled={isLoading}>
          <TrashIcon width={16} height={16} />
        </button>
      </dt>
      {tasks?.map((task) => (
        <Task key={task.id} {...task} />
      ))}
      <dd css={styles.createTaskBtn}>
        <Button onClick={handleTaskCreation} variant="secondary">
          + Add task
        </Button>
      </dd>
    </dl>
  );
};
