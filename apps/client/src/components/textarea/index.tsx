import type { TextareaHTMLAttributes } from 'react';

import * as s from './textarea.styles';

type InputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  variant?: 'primary' | 'secondary';
};

export const TextArea = ({ variant = 'primary', ...rest }: InputProps) => {
  return (
    <textarea css={[s.textArea, s[variant]]} {...rest} />
  );
};
