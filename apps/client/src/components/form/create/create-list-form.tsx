import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';

import { closeModal } from '@/store/features/modal';
import { useCreateListMutation } from '@/store/features/lists';

import { Input } from '@/components/input';

import { form } from './create-form.styles';

export const CreateListForm = () => {
  const dispatch = useAppDispatch();
  const { formId } = useAppSelector(state => state.modal);
  const { currentProject } = useAppSelector(state => state.project);
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
      <Input
        type="text"
        name="name"
        placeholder="List name"
        onChange={(e) => setName(e.target.value)}
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
