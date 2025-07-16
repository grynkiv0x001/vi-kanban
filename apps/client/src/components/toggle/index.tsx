import { type InputHTMLAttributes, useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { setViMode } from '@/store/features/vi';

import * as s from './toggle.styles';

type ToggleProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  variant?: 'primary' | 'secondary';
};

export const Toggle = ({ label, ...rest }: ToggleProps) => {
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
  }, [mode, caretPosition]);

  return (
    <label css={s.label}>
      <span>{label}</span>
      <input
        data-vi="on"
        type="checkbox"
        css={s.toggle}
        onFocus={handleFocus}
        ref={inputRef}
        {...rest}
      />
      <span css={s.slider} />
    </label>
  );
};
