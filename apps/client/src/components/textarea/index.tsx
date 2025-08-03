import type { TextareaHTMLAttributes } from 'react';
import type { css } from '@emotion/react';

import * as s from './textarea.styles';

type InputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  variant?: 'primary' | 'secondary';
  styles?: ReturnType<typeof css>;
};

export const TextArea = ({ variant = 'primary', styles, ...rest }: InputProps) => {
  return (
    <textarea css={[s.textArea, s[variant], styles]} {...rest} />
  );
};
