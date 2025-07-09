import { css, type Theme } from '@emotion/react';

export const textArea = (theme: Theme) => css`
  padding: 8px 12px;
  background-color: ${theme.colors.primary};
  border: 2px solid ${theme.colors.secondary};
  color: ${theme.colors.secondary};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.tertiary};
  }
`;

export const primary = css``;

export const secondary = css`
  background-color: transparent;
  border: none;
`;
