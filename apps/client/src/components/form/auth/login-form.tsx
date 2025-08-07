import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';

import { closeModal, setModalInstance } from '@/store/features/modal';
import { useLoginMutation } from '@/store/services/base.api';

import { Button } from '@/components/button';
import { Input } from '@/components/input';

import { form, textBtn } from './auth-form.styles';

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
      // TODO: Return user data and store it; call getUser query when needed
      await login({ email, password }).unwrap();
      dispatch(closeModal());
    } catch (err) {
      console.error('Failed to login:', err);
    }
  };

  return (
    <>
      <form id={formId} onSubmit={handleSubmit} css={form}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </form>
      <Button onClick={openRegisterForm} variant="text" styles={textBtn}>
        Don't have an account
      </Button>
    </>
  );
};
