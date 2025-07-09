import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';

import { closeModal } from '@/store/features/modal';
import { useCreateProjectMutation } from '@/store/features/projects';

import { Input } from '@/components/input';

export const CreateProjectForm = () => {
  const dispatch = useAppDispatch();
  const { formId } = useAppSelector(state => state.modal);
  const [createProject, { isLoading }] = useCreateProjectMutation();

  const [name, setName] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createProject({ name }).unwrap();
      dispatch(closeModal());
    } catch (err) {
      console.error('Failed to create project:', err);
    }
  };

  return (
    <form id={formId} onSubmit={handleSubmit}>
      <Input
        type="text"
        name="name"
        placeholder="Project name"
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />
    </form>
  );
};
