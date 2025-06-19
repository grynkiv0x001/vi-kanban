import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '@/store';
import { closeModal } from '@/store/features/modal';
import { useCreateProjectMutation } from '@/store/features/projects';

export const CreateProjectForm = () => {
  const dispatch = useDispatch();
  const { formId } = useSelector((state: RootState) => state.modal);
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
      <input
        type="text"
        name="name"
        placeholder="Project name"
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />
    </form>
  );
};
