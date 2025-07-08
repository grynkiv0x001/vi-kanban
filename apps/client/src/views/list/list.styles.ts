import { css, type Theme } from '@emotion/react';

export const list = (theme: Theme) => css`
  margin: 0;
  flex-basis: 300px;
  flex-shrink: 0;
  background-color: transparent;
  border: 2px solid ${theme.colors.secondary};
`;

export const head = (theme: Theme) => css`
  margin-bottom: 8px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.colors.secondary};
  
  button {
    opacity: 0;
  }
  
  &:hover button {
    opacity: 1;
  }
  
  span {
    width: 100%;
    outline: none;
  }
`;

export const removeListBtn = (theme: Theme) => css`
  border: none;
  background-color: transparent;
  
  svg {
    fill: ${theme.colors.danger};
    cursor: pointer;
  }
`;

export const createTaskBtn = css`
  margin: 0;
  padding: 8px;
  
  button {
    width: 100%;
  }
`;

export const name = (theme: Theme) => css`
  padding: 0;
  width: 100%;
  color: ${theme.colors.primary};
  text-overflow: ellipsis;
`;
