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
`;
