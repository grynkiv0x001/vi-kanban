import { css, type Theme } from '@emotion/react';

export const modal = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  min-height: 0;
`;

export const footer = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const deleteButton = (theme: Theme) => css`
  background-color: ${theme.colors.danger};
  color: white;

  &:hover:not(:disabled) {
    background-color: ${theme.colors.danger};
    opacity: 0.9;
  }
`;
