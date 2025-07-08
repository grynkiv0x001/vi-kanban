import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { css } from '@emotion/react';

import * as s from './button.styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  styles?:ReturnType<typeof css>;
  variant?: 'primary' | 'secondary' | 'text';
};

export const Button = ({ children, styles, variant = 'primary', ...rest }: ButtonProps) => {
  return (
    <button css={[s.button, s[variant], styles]} {...rest}>{children}</button>
  );
};
