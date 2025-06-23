import { css, type Theme } from '@emotion/react';

export const header = (theme: Theme) => css`
  padding: 8px 18px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: center;
  height: 42px;

  background-color: ${theme.colors.background};
  color: ${theme.colors.text};
  
  a {
    color: ${theme.colors.text};
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
    fill: ${theme.colors.primary};
  }
`;

export const actions = css`
  display: flex;
  gap: 8px;
  justify-self: flex-end;
`;

export const projectName = (theme: Theme) => css`
  input {
    background-color: transparent;
    border: none;
    color: ${theme.colors.text};
    outline: none;
  }
`;

export const searchBar = (theme: Theme) => css`
  background-color: ${theme.colors.text};
  border: none;
`;

export const accountBtn = (theme: Theme) => css`
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  color: ${theme.colors.text};
  cursor: pointer;
`;
