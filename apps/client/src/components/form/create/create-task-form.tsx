import React, { useState } from 'react';
import Markdown from 'react-markdown';

import { useAppDispatch, useAppSelector } from '@/hooks';

import { closeModal } from '@/store/features/modal';
import { useCreateTaskMutation } from '@/store/features/tasks';

import { Input } from '@/components/input';
import { TextArea } from '@/components/textarea';

import * as styles from './create-form.styles';

export const CreateTaskForm = () => {
  const dispatch = useAppDispatch();
  const { formId, ids } = useAppSelector(state => state.modal);
  const { currentProject } = useAppSelector(state => state.project);
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [position, setPosition] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);

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
    <form id={formId} onSubmit={handleSubmit} css={styles.form}>
      <Input
        type="text"
        name="name"
        placeholder="Task name"
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />
      {(showPreview && description) ? (
        <div
          tabIndex={0}
          onFocus={() => setShowPreview(false)}
          onClick={() => setShowPreview(false)}
          css={styles.description}
        >
          <Markdown>{description}</Markdown>
        </div>
      ) : (
        <TextArea
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => setShowPreview(true)}
          disabled={isLoading}
          styles={styles.description}
          autoFocus
        />
      )}
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
