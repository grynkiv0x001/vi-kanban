import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '@/store';
import { closeModal } from '@/store/features/modal';
import { useCreateListMutation } from '@/store/features/lists';

import { form } from './create-form.styles';

export const CreateListForm = () => {
  const dispatch = useDispatch();
  const { formId } = useSelector((state: RootState) => state.modal);
  const { currentProject } = useSelector((state: RootState) => state.project);
  const [createList, { isLoading }] = useCreateListMutation();

  const [name, setName] = useState<string>('');
  const [position, setPosition] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentProject || !currentProject.id) {
      return;
    }

    try {
      await createList({ name, position, projectId: currentProject?.id }).unwrap();
      dispatch(closeModal());
    } catch (err) {
      console.error('Failed to create a list:', err);
    }
  };

  return (
    <form id={formId} onSubmit={handleSubmit} css={form}>
      <input
        type="text"
        name="name"
        placeholder="List name"
        onChange={(e) => setName(e.target.value)}
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
