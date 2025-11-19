import { css, type Theme } from '@emotion/react';

export const select = (theme: Theme) => css`
  padding: 8px 12px;
  appearance: none;
  background-color: ${theme.colors.primary};
  border: 2px solid ${theme.colors.secondary};
  color: ${theme.colors.secondary};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.tertiary};
  }
`;
