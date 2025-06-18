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
  
  span {
    width: 100%;
    outline: none;
  }
`;

export const removeListBtn = css`
  border: none;
  background-color: transparent;
  
  svg {
    fill: #d3869b;
    cursor: pointer;
  }
`;

export const createTaskBtn = css`
  margin: 0;
  padding: 8px;
`;

export const name = css`
  width: 100%;
  text-overflow: ellipsis;
  background-color: transparent;
  border: none;
  outline: none;
`;
