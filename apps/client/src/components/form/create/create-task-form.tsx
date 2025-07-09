import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';

import { closeModal } from '@/store/features/modal';
import { useCreateTaskMutation } from '@/store/features/tasks';

import { Input } from '@/components/input';
import { TextArea } from '@/components/textarea';

import { form } from './create-form.styles';

export const CreateTaskForm = () => {
  const dispatch = useAppDispatch();
  const { formId, ids } = useAppSelector(state => state.modal);
  const { currentProject } = useAppSelector(state => state.project);
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
      <Input
        type="text"
        name="name"
        placeholder="Task name"
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />
      <TextArea
        name="description"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        disabled={isLoading}
      />
      <Input
        type="number"
        name="position"
        placeholder="Position"
        onChange={(e) => setPosition(Number(e.target.value))}
        disabled={isLoading}
      />
    </form>
  );
};
