import { css, type Theme } from '@emotion/react';

export const caret = (theme: Theme) => css`
  position: absolute;
  box-sizing: border-box;
  z-index: 1;
  
  width: 4px;
  height: 16px;
  
  background-color: transparent;
  border: 2px solid ${theme.colors.tertiary};
`;
