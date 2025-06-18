import { css } from '@emotion/react';

export const projects = css`
  display: flex;
  gap: 32px;
`;

export const project = css`
  position: relative;
  padding: 32px;
  display: flex;
  flex-basis: 300px;
  border: 1px solid #0B0500;
  color: #0B0500;
  
  button {
    opacity: 0;
  }
  
  &:hover {
    color: #d3869b;
    border-color: #d3869b;
    
    button {
      opacity: 1;
    }
  }
`;

export const addProjectBtn = css`
  padding: 32px;
  flex-basis: 300px;
  background-color: transparent;
  border: 1px solid #0B0500;
  color: #0B0500;
  text-align: left;

  &:hover {
    color: #d3869b;
    border-color: #d3869b;
    cursor: pointer;
  } 
`;

export const removeProjectBtn = css`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e5e5e5;
  border: none;
  cursor: pointer;
`;
