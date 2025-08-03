import React, { useState } from 'react';
import Markdown from 'react-markdown';

import { useAppDispatch, useAppSelector } from '@/hooks';

import { closeModal } from '@/store/features/modal';
import { useUpdateTaskMutation } from '@/store/features/tasks';

import { Input } from '@/components/input';
import { TextArea } from '@/components/textarea';

import * as styles from './edit-form.styles';

export const EditTaskForm = () => {
  const dispatch = useAppDispatch();
  const { formId, data } = useAppSelector(state => state.modal);

  const [updateTask, { isLoading }] = useUpdateTaskMutation();

  const [name, setName] = useState<string>(data?.name || '');
  const [description, setDescription] = useState<string>(data?.description || '');
  const [position, setPosition] = useState<number | null>(data?.position || null);
  const [showPreview, setShowPreview] = useState<boolean>(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      {showPreview ? (
        <div onClick={() => setShowPreview(false)} css={styles.description}>
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
