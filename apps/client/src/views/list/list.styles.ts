import { css } from '@emotion/react';

export const list = css`
  margin: 0;
  flex-basis: 300px;
  flex-shrink: 0;
  background-color: #fff;
`;

export const head = css`
  margin-bottom: 8px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #E5E5E5;
`;

export const removeListBtn = css`
  border: none;
  background-color: transparent;
  
  svg {
    fill: #d3869b;
    cursor: pointer;
  }
`;

export const task = css`
  margin: 0;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  button {
    background-color: transparent;
    border: none;
    opacity: 0;
    cursor: pointer;
    
    svg {
      fill: #d3869b;
    }
  }
  
  &:hover button {
    opacity: 1;
  }
`;

export const createTaskBtn = css`
  margin: 0;
  padding: 8px;
`;
