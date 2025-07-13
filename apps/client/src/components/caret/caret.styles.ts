import { css, type Theme } from '@emotion/react';

export const caret = (theme: Theme) => css`
  position: absolute;
  
  width: 4px;
  height: 16px;
  
  background-color: ${theme.colors.tertiary};
`;
