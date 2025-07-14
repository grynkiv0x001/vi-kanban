import { css, type Theme } from '@emotion/react';

export const button = (theme: Theme) => css`
  padding: 8px 12px;
  
  background-color: transparent;
  border: 2px solid transparent;
  color: ${theme.colors.primary};
  
  transition: background-color 0.2s ease-out, color 0.2s ease-out;
  
  &:hover {
    cursor: pointer;
    transition: background-color 0.2s ease-in, color 0.2s ease-in;
  }
`;

export const primary = (theme: Theme) => css`
  background-color: ${theme.colors.accent};
  
  &:hover {
    background-color: ${theme.colors.hover};
  }
`;

export const secondary = (theme: Theme) => css`
  border-color: ${theme.colors.accent};
  color: ${theme.colors.secondary};

  &:hover {
    background-color: ${theme.colors.accent};
    color: ${theme.colors.primary};
  }
`;

export const text = (theme: Theme) => css`
  padding: 2px;
  border: none;
  color: ${theme.colors.tertiary};
`;

export const textSecondary = (theme: Theme) => css`
  padding: 2px;
  border: 2px solid transparent;
  color: ${theme.colors.secondary};

  &:hover {
    color: ${theme.colors.accent};
  }
`;
