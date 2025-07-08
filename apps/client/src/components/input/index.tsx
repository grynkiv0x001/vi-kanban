import type { InputHTMLAttributes } from 'react';

import * as s from './input.styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: 'primary' | 'secondary';
};

export const Input = ({ variant = 'primary', ...rest }: InputProps) => {
  return (
    <input css={[s.input, s[variant]]} {...rest} />
  );
};
