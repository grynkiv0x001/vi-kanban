import { type InputHTMLAttributes, useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { setViMode } from '@/store/features/vi';

import * as s from './input.styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: 'primary' | 'secondary';
};

export const Input = ({ variant = 'primary', ...rest }: InputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(state => state.vi);

  const handleFocus = () => {
    if (mode !== 'command') {
      dispatch(setViMode('insert'));
    }
  };

  useEffect(() => {
    if (mode === 'normal') {
      inputRef.current?.blur();
      return;
    }

    if (mode === 'command') {
      inputRef.current?.focus();
      return;
    }

    if (mode === 'insert') {
      inputRef.current?.focus();
      return;
    }
  }, [mode]);

  return (
    <input
      data-vi="on"
      css={[s.input, s[variant]]}
      onFocus={handleFocus}
      ref={inputRef}
      {...rest}
    />
  );
};
