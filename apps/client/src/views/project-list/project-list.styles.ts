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
  border: 1px solid ${theme.colors.text};
  color: ${theme.colors.text};
  
  button {
    opacity: 0;
  }
  
  &:hover {
    color: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
    
    button {
      opacity: 1;
    }
  }
`;

export const addProjectBtn = (theme: Theme) => css`
  padding: 32px;
  flex-basis: 300px;
  background-color: transparent;
  border: 1px solid ${theme.colors.background};
  color: ${theme.colors.background};
  text-align: left;

  &:hover {
    color: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
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
  background-color: ${theme.colors.text};
  border: none;
  cursor: pointer;
  
  &:hover {
    svg {
      fill: ${theme.colors.primary};
    }
  }
`;
