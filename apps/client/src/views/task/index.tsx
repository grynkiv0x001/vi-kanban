import { useEffect, useState } from 'react';

import { type Task as TaskPropType } from 'shared/src/types';

import { DeleteIcon } from '@/assets/icons';

import { useDeleteTaskMutation, useUpdateTaskMutation } from '@/store/features/tasks';

import { Input } from '@/components/input';

import * as styles from './task.styles';

export const Task = (task: TaskPropType) => {
  const { name, id, projectId, listId } = task;

  const [updateTask] = useUpdateTaskMutation();
  const [removeTask, { isLoading: updating }] = useDeleteTaskMutation();

  const [taskName, setTaskName] = useState<string>(name);

  useEffect(() => {
    setTaskName(name);
  }, [name]);

  const handleBlur = async () => {
    if (taskName === name) {
      return;
    }

    try {
      await updateTask({ ...task, name: taskName }).unwrap();
    } catch (error) {
      console.error('Failed to rename task:', error);
    }
  };

  const handleTaskRemoval = async () => {
    removeTask({ id, projectId, listId });
  };

  return (
    <dd css={styles.task}>
      <Input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        onBlur={handleBlur}
        disabled={updating}
        css={styles.name}
        variant="secondary"
      />
      <button onClick={handleTaskRemoval}>
        <DeleteIcon width={16} height={16} />
      </button>
    </dd>
  );
};
