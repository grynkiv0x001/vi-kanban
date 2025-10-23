import { type ButtonHTMLAttributes, type ReactNode, useEffect, useRef } from 'react';
import type { css } from '@emotion/react';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { setViMode } from '@/store/features/vi';

import * as s from './button.styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  styles?: ReturnType<typeof css>;
  variant?: 'primary' | 'secondary' | 'text' | 'textSecondary';
};

export const Button = ({ children, styles, variant = 'primary', ...rest }: ButtonProps) => {
  const dispatch = useAppDispatch();
  const { device, mode, caretPosition } = useAppSelector(state => state.vi);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (mode === 'insert' && device === 'keyboard') {
      const button = buttonRef.current;
      const dialog = button?.closest('dialog');

      if (dialog?.open) {
        return;
      }

      if (button && button?.dataset.viId === caretPosition.elementId) {
        button.click();
        dispatch(setViMode('normal'));
      }
    }
  }, [device, mode, caretPosition, dispatch]);

  return (
    <button
      ref={buttonRef}
      data-vi="on"
      css={[s.button, s[variant], styles]} {...rest}
    >
      {children}
    </button>
  );
};
