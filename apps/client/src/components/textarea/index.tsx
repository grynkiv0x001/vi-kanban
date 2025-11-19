import type { TextareaHTMLAttributes } from 'react';
import type { css } from '@emotion/react';

import * as s from './textarea.styles';

type InputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  variant?: 'primary' | 'secondary';
  styles?: ReturnType<typeof css>;
};

export const TextArea = ({ variant = 'primary', styles, ...rest }: InputProps) => {
  return (
    <textarea
      css={[s.textArea, s[variant], styles]}
      onFocus={(e) =>
        e.currentTarget.setSelectionRange(
          e.currentTarget.value.length,
          e.currentTarget.value.length,
        )
      }
      {...rest}
    />
  );
};
