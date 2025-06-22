import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import { useAppDispatch, useAppSelector } from '@/hooks';

import { closeModal, setModalInstance } from '@/store/features/modal';
import { useRegisterMutation } from '@/store/services/base.api';

import { form } from './auth-form.styles';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { formId } = useAppSelector(state => state.modal);
  const [register, { isLoading }] = useRegisterMutation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const openLoginForm = () => {
    dispatch(setModalInstance('login'));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register({ email, password }).unwrap();
      dispatch(closeModal());
      navigate('/');
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
      <button onClick={openLoginForm}>
        Already have account {'->'}
      </button>
    </form>
  );
};
