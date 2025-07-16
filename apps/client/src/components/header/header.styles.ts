import { css, type Theme } from '@emotion/react';

export const header = (theme: Theme) => css`
  padding: 8px 18px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: center;
  min-height: 42px;

  background-color: ${theme.colors.prePrimary};
  color: ${theme.colors.secondary};
  
  a {
    color: ${theme.colors.secondary};
  }
`;

export const nav = css`
  display: flex;
  align-items: center;
  gap: 18px;
  height: 100%;
`;

export const logo = (theme: Theme) => css`
  svg {
    fill: ${theme.colors.accent};
  }
`;

export const actions = css`
  display: flex;
  gap: 8px;
  justify-self: flex-end;
`;
