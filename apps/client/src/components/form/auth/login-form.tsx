import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';

import { closeModal, setModalInstance } from '@/store/features/modal';
import { useLoginMutation } from '@/store/services/base.api';

import { form } from './auth-form.styles';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { formId } = useAppSelector(state => state.modal);
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const openRegisterForm = () => {
    dispatch(setModalInstance('register'));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login({ email, password }).unwrap();
      dispatch(closeModal());
    } catch (err) {
      console.error('Failed to login:', err);
    }
  };

  return (
    <form id={formId} onSubmit={handleSubmit} css={form}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
      <button onClick={openRegisterForm}>
        Don't have account {'->'}
      </button>
    </form>
  );
};
