import { css, type Theme } from '@emotion/react';

export const projects = css`
  display: flex;
  gap: 32px;
`;

export const project = (theme: Theme) => css`
  position: relative;
  padding: 32px;
  display: flex;
  flex-basis: 300px;
  border: 2px solid ${theme.colors.secondary};
  color: ${theme.colors.secondary};
  
  button {
    opacity: 0;
  }
  
  &:hover {
    color: ${theme.colors.accent};
    border-color: ${theme.colors.accent};
    
    button {
      opacity: 1;
    }
  }
`;

export const addProjectBtn = (theme: Theme) => css`
  padding: 32px;
  flex-basis: 300px;
  background-color: transparent;
  border: 2px solid ${theme.colors.secondary};
  color: ${theme.colors.secondary};
  text-align: left;

  &:hover {
    color: ${theme.colors.accent};
    border-color: ${theme.colors.accent};
    cursor: pointer;
  } 
`;

export const removeProjectBtn = (theme: Theme) => css`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.prePrimary};
  border: none;
  cursor: pointer;
  
  svg {
    fill: ${theme.colors.secondary};
  }
  
  &:hover {
    svg {
      fill: ${theme.colors.danger};
    }
  }
`;
