import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '@/store';
import { closeModal } from '@/store/features/modal';
import { useCreateTaskMutation } from '@/store/features/tasks';

import { form } from './create-form.styles';

export const CreateTaskForm = () => {
  const dispatch = useDispatch();
  const { formId, ids } = useSelector((state: RootState) => state.modal);
  const { currentProject } = useSelector((state: RootState) => state.project);
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [position, setPosition] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentProject || !currentProject.id || !ids || !ids.listId) {
      return;
    }

    try {
      await createTask({
        name,
        position,
        description,
        projectId: currentProject.id,
        listId: ids.listId,
      }).unwrap();
      dispatch(closeModal());
    } catch (err) {
      console.error('Failed to create a task:', err);
    }
  };

  return (
    <form id={formId} onSubmit={handleSubmit} css={form}>
      <input
        type="text"
        name="name"
        placeholder="Task name"
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        disabled={isLoading}
      />
      <input
        type="number"
        name="position"
        placeholder="Position"
        onChange={(e) => setPosition(Number(e.target.value))}
        disabled={isLoading}
      />
    </form>
  );
};
