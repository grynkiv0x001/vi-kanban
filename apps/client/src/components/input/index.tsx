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
  const { mode, caretPosition } = useAppSelector(state => state.vi);

  const handleFocus = () => {
    if (mode !== 'command') {
      dispatch(setViMode('insert'));
    }
  };

  useEffect(() => {
    if (mode === 'insert') {
      if (inputRef.current?.dataset.viId === caretPosition.elementId) {
        inputRef.current?.focus();
      }
    }

    if (mode === 'normal') {
      inputRef.current?.blur();
    }
  }, [mode, caretPosition]);

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
