import { css, type Theme } from '@emotion/react';

export const caret = (theme: Theme) => css`
  position: absolute;
  
  width: 4px;
  height: 8px;
  
  background-color: ${theme.colors.tertiary};
`;

export const insert = css`
  width: 2px;
`;
